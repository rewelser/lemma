package com.example.restservice.service;

import com.example.restservice.dto.PostDTO;
import com.example.restservice.model.Post;
import com.example.restservice.model.PostAction;
import com.example.restservice.model.PostActionType;
import com.example.restservice.model.User;
import com.example.restservice.model.Vote;
import com.example.restservice.repository.VoteRepository;

import jakarta.annotation.PostConstruct;

import com.example.restservice.repository.PostActionRepository;
import com.example.restservice.repository.PostRepository;
import com.example.restservice.dto.PostActionDTO; // maybe not needed?
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;



@Service
public class PostService {
    // public class PostService implements ApplicationListener<ContextRefreshedEvent> {
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;
    private final UserService userService;
    private final PostActionRepository postActionRepository;
    
    public PostService(PostRepository postRepository, VoteRepository voteRepository, UserService userService, PostActionRepository postActionRepository) {
        this.postRepository = postRepository;
        this.voteRepository = voteRepository;
        this.userService = userService;
        this.postActionRepository = postActionRepository;
    }
    

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Optional<Post> updatePost(Long id, Post postDetails) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(postDetails.getTitle());
            post.setDescription(postDetails.getDescription());
            return postRepository.save(post);
        });
    }

    public boolean deletePost(Long id) {
        return postRepository.findById(id).map(post -> {
            postRepository.delete(post);
            return true;
        }).orElse(false);
    }

    public Optional<Post> getPostById(Long id) {
        // used to be: return postRepository.findById(id); but these are slightly different
        return postRepository.findByIdWithActions(id);
    }

    public Optional<PostDTO> getPostDTOById(Long id) {
        return postRepository.findByIdWithActions(id).map(PostDTO::new);
    }

    public Vote voteOnAction(User user, PostAction action, int delta) {
        if (delta < -1 || delta > 1) {
            throw new IllegalArgumentException("Invalid vote value");
        }
    
        return voteRepository.findByUserAndAction(user, action).map(vote -> {
            int current = vote.getVoteValue();
            int newValue = (current == delta) ? 0 : delta; // toggle vote
            vote.setVoteValue(newValue);
            return voteRepository.save(vote);
        }).orElseGet(() -> {
            Vote vote = new Vote();
            vote.setUser(user);
            vote.setAction(action); // this replaces actionId
            vote.setVoteValue(delta);
            return voteRepository.save(vote);
        });
    }    

    public List<Vote> getVotesByUser(User user) {
        return voteRepository.findByUser(user);
    }

    // @Transactional
    // public void debugPrintSeededPosts() {
    //     postRepository.findAll().forEach(post -> {
    //         System.out.println("📦 Post: " + post.getTitle() + " | Actions: " + post.getActions().size());
    //     });
    // }

    // @Override
    // public void onApplicationEvent(ContextRefreshedEvent event) {
    //     seedPosts(); // will now be called after Spring is ready
    // }

    // @Transactional
    @PostConstruct
    public void seedPosts() {
        if (postRepository.count() > 0) return;

        User author1 = userService.findByUsername("cooluser");
        User author2 = userService.findByUsername("otheruser");
        User commenter = userService.findByUsername("someuser");
        User proposer = userService.findByUsername("proposer123");

        if (author1 == null || author2 == null || commenter == null || proposer == null) {
            System.out.println("❌ Seed users missing. Create users first.");
            return;
        }

        // Post 1: Foundational Concept
        Post post1 = new Post();
        post1.setTitle("Foundational Concept");
        post1.setDescription("This is the body of the first post.");
        post1.setUser(author1);
        postRepository.save(post1);

        // Comment on Post 1
        PostAction comment1 = new PostAction();
        comment1.setType(PostActionType.COMMENT);
        comment1.setText("Really interesting concept.");
        comment1.setUser(commenter);
        comment1.setPost(post1);
        post1.getActions().add(comment1);

        // Post 2: Follow-up Idea
        Post post2 = new Post();
        post2.setTitle("Follow-up Idea");
        post2.setDescription("This post builds on the first one.");
        post2.setUser(author2);
        postRepository.save(post2);

        // Relationship proposal on Post 2 that links to Post 1
        PostAction proposal = new PostAction();
        proposal.setType(PostActionType.RELATIONSHIP_PROPOSAL);
        proposal.setUser(proposer);
        proposal.setPost(post2);
        proposal.setTargetPost(post1);
        post2.getActions().add(proposal);

        // Save actions
        postActionRepository.save(comment1);
        postActionRepository.save(proposal);

        // (Optional) Add 2 votes to the proposal to simulate `votes: 2`
        Vote v1 = new Vote();
        v1.setUser(author1);
        v1.setAction(proposal); // ✅ instead of .setActionId()
        v1.setVoteValue(1);
        
        Vote v2 = new Vote();
        v2.setUser(commenter);
        v2.setAction(proposal);
        v2.setVoteValue(1);
        

        voteRepository.save(v1);
        voteRepository.save(v2);

        System.out.println("✅ Seed posts inserted");
        // debugPrintSeededPosts(); // <-- now safe due to @Transactional
        postRepository.findAll().forEach(post -> {
            // System.out.println("📦 Post: " + post.getTitle() + " | Actions: " + post.getActions().size());
            System.out.println("📦 Total posts inserted: " + postRepository.count());
        });
        
    }

}
