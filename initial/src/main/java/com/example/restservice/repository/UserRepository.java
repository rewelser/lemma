package com.example.restservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.restservice.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query methods (if needed) go here;
    // No extra methods needed for basic CRUD operations
}