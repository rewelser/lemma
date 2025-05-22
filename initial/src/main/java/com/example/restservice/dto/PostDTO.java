package com.example.restservice.dto;

import com.example.restservice.model.Post;
import com.example.restservice.model.PostAction;

import java.util.List;
import java.util.stream.Collectors;

public class PostDTO {
    private Long id;
    private String title;
    private String description;
    private String author;
    private List<PostActionDTO> actions;

    public PostDTO(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.description = post.getDescription();
        this.author = post.getUser() != null ? post.getUser().getUsername() : "unknown";
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

    public String getDescription() {
        return description;
    }

    public String getAuthor() {
        return author;
    }

    public List<PostActionDTO> getActions() {
        return actions;
    }
}
