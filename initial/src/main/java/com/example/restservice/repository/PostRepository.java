package com.example.restservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

import com.example.restservice.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom query methods (if needed) go here;
    // No extra methods needed for basic CRUD operations

    // ✅ Fetch a post with actions (eager loading) -- For single post fetch
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.actions WHERE p.id = :id")
    Optional<Post> findByIdWithActions(Long id);

    // ✅ For paginated post feed with actions
    @EntityGraph(attributePaths = "actions") // ← eager load actions per post
    Page<Post> findAll(Pageable pageable);
}