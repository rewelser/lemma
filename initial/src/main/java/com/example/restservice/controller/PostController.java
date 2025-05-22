package com.example.restservice.controller;

import com.example.restservice.dto.VoteResponseDTO;
import com.example.restservice.dto.PostDTO;
import com.example.restservice.model.Post;
import com.example.restservice.model.User;
import com.example.restservice.model.Vote;
import com.example.restservice.repository.PostActionRepository;
import com.example.restservice.security.JwtUtil;
import com.example.restservice.service.PostService;
import com.example.restservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final PostActionRepository postActionRepository;

    public PostController(PostService postService, UserService userService, PostActionRepository postActionRepository) {
        this.postService = postService;
        this.userService = userService;
        this.postActionRepository = postActionRepository;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/dto")
    public ResponseEntity<PostDTO> getPostDtoById(@PathVariable Long id) {
        return postService.getPostDTOById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        return postService.updatePost(id, postDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        return postService.deletePost(id) ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/vote")
    public ResponseEntity<VoteResponseDTO> voteOnAction(
        @AuthenticationPrincipal User user,
        @RequestBody Map<String, Object> payload
    ) {
        System.out.println("🔥 In vote endpoint, user: " + user);
    
        if (user == null) {
            System.out.println("❌ User not injected!");
            return ResponseEntity.status(401).build();
        }
    
        try {
            Long actionId = ((Number) payload.get("actionId")).longValue();
            int delta = (int) payload.get("delta");
    
            var actionOpt = postActionRepository.findById(actionId);
            if (actionOpt.isEmpty()) {
                System.out.println("❌ No such PostAction for id=" + actionId);
                return ResponseEntity.status(404).build();
            }
    
            var vote = postService.voteOnAction(user, actionOpt.get(), delta);
            return ResponseEntity.ok(new VoteResponseDTO(vote));
        } catch (Exception e) {
            System.out.println("wumbo");
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }
    }
    

    @GetMapping("/my-votes")
    public ResponseEntity<List<VoteResponseDTO>> getMyVotes(@AuthenticationPrincipal User user) {
        List<Vote> votes = postService.getVotesByUser(user);
        List<VoteResponseDTO> response = votes.stream()
            .map(VoteResponseDTO::new)
            .toList();
        return ResponseEntity.ok(response);
}

}
