package com.example.restservice.model;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 🔗 Relationships (e.g., "dependsOn", etc.)
    @ManyToMany
    @JoinTable(
        name = "post_connections",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "related_post_id")
    )
    private List<Post> relatedPosts = new ArrayList<>();

    // ✅ NEW: Actions like comments & relationship proposals
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostAction> actions = new ArrayList<>();

    // --- Constructors ---
    public Post() {}

    public Post(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<Post> getRelatedPosts() { return relatedPosts; }
    public void setRelatedPosts(List<Post> relatedPosts) {
        this.relatedPosts = relatedPosts;
    }

    public List<PostAction> getActions() { return actions; }
    public void setActions(List<PostAction> actions) { this.actions = actions; }

    public void addAction(PostAction action) {
        actions.add(action);
        action.setPost(this); // maintain bidirectional consistency
    }

    public void removeAction(PostAction action) {
        actions.remove(action);
        action.setPost(null);
    }
}
