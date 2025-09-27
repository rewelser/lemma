package com.example.restservice.dto;

import java.util.List;

public class CreatePostDTO {
    private String title;
    private String body;
    private List<RelationshipDTO> relationships;

    public static class RelationshipDTO {
        private String type; // e.g., "dependsOn"
        private TargetPostDTO post;

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public TargetPostDTO getPost() {
            return post;
        }

        public void setPost(TargetPostDTO post) {
            this.post = post;
        }

        public static class TargetPostDTO {
            private Long id;
            private String title;
            private String author;

            public Long getId() {
                return id;
            }

            public void setId(Long id) {
                this.id = id;
            }

            public String getTitle() {
                return title;
            }

            public void setTitle(String title) {
                this.title = title;
            }

            public String getAuthor() {
                return author;
            }

            public void setAuthor(String author) {
                this.author = author;
            }
        }
    }

    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<RelationshipDTO> getRelationships() {
        return relationships;
    }

    public void setRelationships(List<RelationshipDTO> relationships) {
        this.relationships = relationships;
    }
}
