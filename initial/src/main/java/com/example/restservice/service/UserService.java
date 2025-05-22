package com.example.restservice.service;

import com.example.restservice.model.User;
import com.example.restservice.repository.UserRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // @PostConstruct
    // public void seedUser() {
    //     if (userRepository.findByUsername("ichorholic").isEmpty()) {
    //         User user = new User();
    //         user.setUsername("ichorholic");
    //         user.setPassword("dummy"); // or hash it if needed
    //         user.setEmail("mail@test.com");
    //         userRepository.save(user);
    //         System.out.println("🌱 Seeded user: ichorholic");
    //     }
    // }

    @PostConstruct
    public void seedUsers() {
        List<String> usernames = List.of("ichorholic", "cooluser", "otheruser", "someuser", "proposer123");

        for (String username : usernames) {
            if (userRepository.findByUsername(username).isEmpty()) {
                User user = new User();
                user.setUsername(username);
                user.setPassword("dummy"); // Replace with hashed password if needed
                user.setEmail(username + "@example.com");
                userRepository.save(user);
                System.out.println("🌱 Seeded user: " + username);
            }
        }
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}

