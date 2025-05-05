package com.example.restservice.service;

import com.example.restservice.model.User;
import com.example.restservice.repository.UserRepository;
import com.example.restservice.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(String username, String email, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isPresent()) {
            throw new RuntimeException("Username already taken");
        } else {
            User user = new User(username, email, passwordEncoder.encode(password));
            userRepository.save(user);
            return jwtUtil.generateToken(username);
        }
    }

    public String login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        // if (userOpt.isPresent()) {
        //     User user = userOpt.get();
        //     if (passwordEncoder.matches(password, user.getPassword())) {
        //         return jwtUtil.generateToken(username);
        //     } else {
        //         throw new RuntimeException("Invalid credentials");
        //     }
        // } else {
        //     throw new RuntimeException("Invalid credentials");
        // }
        ////////////////////
        // if (userOpt.isPresent()) {
        //     User user = userOpt.get();
        //     logger.info("User found: " + user.getUsername());
        //     logger.info("Stored password hash: " + user.getPassword());
    
        //     if (passwordEncoder.matches(password, user.getPassword())) {
        //         logger.info("Password matches!");
        //         return jwtUtil.generateToken(username);
        //     } else {
        //         logger.warn("Password does not match for user: " + username);
        //         throw new RuntimeException("Invalid credentials");
        //     }
        // } else {
        //     logger.warn("User not found: " + username);
        //     throw new RuntimeException("Invalid credentials");
        // }
        ///////////////
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            logger.info("User found: " + user.getUsername());
            logger.info("Stored password hash: " + user.getPassword());
            logger.info("Raw password input: " + password);
    
            boolean match = passwordEncoder.matches(password, user.getPassword());
            logger.info("Password match result: " + match);
    
            if (match) {
                logger.info("Password matches!");
                return jwtUtil.generateToken(username);
            } else {
                logger.warn("Password does not match for user: " + username);
                throw new RuntimeException("Invalid credentials");
            }
        } else {
            logger.warn("User not found: " + username);
            throw new RuntimeException("Invalid credentials");
        }
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        Optional<User> userOpt = userRepository.findByUsername(username);
    
        if (userOpt.isPresent()) {
            User user = userOpt.get();
    
            // Verify old password before allowing change
            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                throw new RuntimeException("Old password is incorrect.");
            }
    
            // Hash and update new password
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found.");
        }
    }
    
}
