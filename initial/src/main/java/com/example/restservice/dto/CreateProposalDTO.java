package com.example.restservice.dto;

public class CreateProposalDTO {
    private Long postId;
    private Long targetPostId;
    private String relationshipType;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getTargetPostId() {
        return targetPostId;
    }

    public void setTargetPostId(Long targetPostId) {
        this.targetPostId = targetPostId;
    }

    public String getRelationshipType() {
        return relationshipType;
    }

    public void setRelationshipType(String relationshipType) {
        this.relationshipType = relationshipType;
    }
}
