package com.example.restservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

import com.example.restservice.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom query methods (if needed) go here;
    // No extra methods needed for basic CRUD operations

    // ✅ Fetch a post with actions (eager loading)
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.actions WHERE p.id = :id")
    Optional<Post> findByIdWithActions(Long id);
}