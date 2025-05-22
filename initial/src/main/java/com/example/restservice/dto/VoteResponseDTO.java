package com.example.restservice.dto;

import com.example.restservice.model.Vote;

import java.time.Instant;

public class VoteResponseDTO {
    private long id;
    private int voteValue;
    private Long actionId;
    private String username;
    private Instant createdAt;

    public VoteResponseDTO(Vote vote) {
        this.id = vote.getId();
        this.voteValue = vote.getVoteValue();
        this.actionId = vote.getAction().getId(); // ✅ fixed
        this.username = vote.getUser().getUsername(); // ← no lazy issue here
        this.createdAt = vote.getCreatedAt();
    }

    // ✅ Getters for JSON serialization
    public long getId() {
        return id;
    }

    public int getVoteValue() {
        return voteValue;
    }

    public Long getActionId() {
        return actionId;
    }

    public String getUsername() {
        return username;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
