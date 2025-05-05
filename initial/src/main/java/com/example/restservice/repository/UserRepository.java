package com.example.restservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.restservice.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query methods (if needed) go here;
    // No extra methods needed for basic CRUD operations
    Optional<User> findByUsername(String username);
}