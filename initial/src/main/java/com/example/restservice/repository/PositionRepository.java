package com.example.restservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.restservice.model.Position;

public interface PositionRepository extends JpaRepository<Position, Long> {
    // Custom query methods (if needed) go here;
    // No extra methods needed for basic CRUD operations
}