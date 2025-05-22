package com.example.restservice.repository;

import com.example.restservice.model.PostAction;
import com.example.restservice.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostActionRepository extends JpaRepository<PostAction, Long> {
    List<PostAction> findByPost(Post post);
}
