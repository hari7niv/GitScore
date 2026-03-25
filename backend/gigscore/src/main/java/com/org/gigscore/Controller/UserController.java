package com.org.gigscore.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.gigscore.DTO.CreateUserRequest;
import com.org.gigscore.DTO.LoginDTO;
import com.org.gigscore.DTO.LoginResponseDTO;
import com.org.gigscore.DTO.UserDashboardResponse;
import com.org.gigscore.Service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<LoginResponseDTO> createUser(@RequestBody CreateUserRequest request){
        return userService.createUser(request);
    }

    @GetMapping("/{userId}")
    public UserDashboardResponse getUserDetails(@PathVariable Long userId) {
        return userService.getUserDashboard(userId);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO request) {
        return userService.Login(request);
    }

    

}
