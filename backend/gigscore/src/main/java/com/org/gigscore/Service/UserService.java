package com.org.gigscore.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.org.gigscore.DTO.LoginDTO;
import com.org.gigscore.DTO.UserDashboardResponse;
import com.org.gigscore.Entity.User;
import com.org.gigscore.Repository.UserRepository;

import org.springframework.http.ResponseEntity;

import com.org.gigscore.Config.JWTutill;



@Service
public class UserService {

    final UserRepository userRepository;
    final GigDataService gigDataService;
    private final JWTutill jwtUtil;
        
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, GigDataService gigDataService, JWTutill jwtUtil) {
        this.userRepository = userRepository;
        this.gigDataService = gigDataService;
        this.jwtUtil = jwtUtil;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        return userRepository.save(user);
    }

    public UserDashboardResponse getUserDashboard(Long userId) {
        return gigDataService.getUserDashboard(userId);
    }

    public ResponseEntity<String> Login(LoginDTO request) {
        
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(token);
    }
    
}
