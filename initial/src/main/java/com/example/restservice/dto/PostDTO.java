package com.example.restservice.dto;

import com.example.restservice.model.Post;
import com.example.restservice.model.PostAction;

import java.util.List;
import java.util.stream.Collectors;

public class PostDTO {
    private Long id;
    private String title;
    private String body;
    private String author;
    private java.time.Instant createdAt;
    private List<PostActionDTO> actions;


    public PostDTO(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.body = post.getBody();
        this.author = post.getUser() != null ? post.getUser().getUsername() : "unknown";
        this.createdAt = post.getCreatedAt();
        this.actions = post.getActions().stream()
                .map(PostActionDTO::new)
                .collect(Collectors.toList());
    }

    // Getters for serialization

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getAuthor() {
        return author;
    }

    public java.time.Instant getCreatedAt() {
        return createdAt;
    }    

    public List<PostActionDTO> getActions() {
        return actions;
    }
}
