package com.example.restservice.controller;

import com.example.restservice.service.AuthService;

import jakarta.annotation.PostConstruct;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.example.restservice.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    // private final JwtUtil jwtUtil;

    public AuthController(AuthService authService) {
        this.authService = authService;
        // this.jwtUtil = 
    }

    // @GetMapping("/debug/token")
    // public ResponseEntity<String> generateTokenForDebug(@RequestParam String username) {
    //     String token = jwtUtil.generateToken(username);
    //     return ResponseEntity.ok(token);
    // }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> request) {
        String token = authService.register(request.get("username"), request.get("email"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String token = authService.login(request.get("username"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }
}
