package com.org.gigscore.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.gigscore.DTO.LoginDTO;
import com.org.gigscore.DTO.UserDashboardResponse;
import com.org.gigscore.Entity.User;
import com.org.gigscore.Service.UserService;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users")
public class UserController {

    final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User request){
        return userService.createUser(request);
    }

    @GetMapping("/{userId}")
    public UserDashboardResponse getUserDetails(@PathVariable Long userId) {
        return userService.getUserDashboard(userId);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO request) {
        return userService.Login(request);
    }

    

}