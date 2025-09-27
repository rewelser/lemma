package com.example.restservice.dto;

import java.time.Instant;

import com.example.restservice.model.PostAction;
import com.example.restservice.model.PostActionType;

public class PostActionDTO {
    private Long id;
    private String type; // "comment" or "relationshipProposal"
    private String author;
    private String text; // only if type == comment
    private String relationshipType; // only if type == relationshipProposal
    private TargetPostDTO targetPost; // only if type == relationshipProposal
    private Instant createdAt;
    private int voteCount; // ← total votes

    // Nested DTO for proposals
    public static class TargetPostDTO {
        private Long id;
        private String title;
        private String author;

        public TargetPostDTO(Long id, String title, String author) {
            this.id = id;
            this.title = title;
            this.author = author;
        }

        public Long getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public String getAuthor() {
            return author;
        }
    }

    // Constructor
    public PostActionDTO(
        Long id,
        String type,
        String author,
        String text,
        String relationshipType,
        TargetPostDTO targetPost,
        Instant createdAt,
        int voteCount
    ) {
        this.id = id;
        this.type = type;
        this.author = author;
        this.text = text;
        this.relationshipType = relationshipType;
        this.targetPost = targetPost;
        this.createdAt = createdAt;
        this.voteCount = voteCount;
    }

    public PostActionDTO(PostAction action) {
        this.id = action.getId();
        // this.type = action.getType().name();
        this.type = switch (action.getType()) {
            case COMMENT -> "comment";
            case RELATIONSHIP_PROPOSAL -> "relationshipProposal";
        };        
        this.author = action.getUser() != null ? action.getUser().getUsername() : "unknown";
        this.createdAt = action.getCreatedAt();
        this.voteCount = action.getVotes().size();
    
        if (action.getType() == PostActionType.COMMENT) {
            this.text = action.getText();
        } else if (action.getType() == PostActionType.RELATIONSHIP_PROPOSAL) {
            this.relationshipType = action.getRelationshipType();
            if (action.getTargetPost() != null) {
                this.targetPost = new TargetPostDTO(
                    action.getTargetPost().getId(),
                    action.getTargetPost().getTitle(),
                    action.getTargetPost().getUser() != null ? action.getTargetPost().getUser().getUsername() : "unknown"
                );
            }
        }
    }
    

    // Getters for JSON serialization
    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getAuthor() {
        return author;
    }

    public String getText() {
        return text;
    }

    public String getRelationshipType() {
        return relationshipType;
    }

    public TargetPostDTO getTargetPost() {
        return targetPost;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public int getVoteCount() {
        return voteCount;
    }
}
