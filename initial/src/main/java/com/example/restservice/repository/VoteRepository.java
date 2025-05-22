package com.example.restservice.repository;

import com.example.restservice.model.Vote;
import com.example.restservice.model.User;
import com.example.restservice.model.PostAction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserAndAction(User user, PostAction action);
    List<Vote> findByUser(User user);
}
