import PostList from "../components/PostList";
import NewPostForm from "../components/NewPostForm";
import { useState } from "react";
import { useEffect } from "react";
import { PostType, PostRelationshipKindType, RelationshipProposalActionType } from "../types";
import { fetchPostDTO, fetchMyVotes, fetchPaginatedPosts, createPost as createPostAPI, voteOnAction as voteOnActionAPI, proposeRelationship } from "../api"; // adjust path as needed

const Home: React.FC = () => {

  const [userVotes, setUserVotes] = useState<Record<number, number>>({}); // key: actionId, value: 1 or -1
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [relationshipError, setRelationshipError] = useState<string | null>(null);

  // const [posts, setPosts] = useState<PostType[]>([
  //   {
  //     id: 1,
  //     title: "Foundational Concept",
  //     body: "This is the body of the first post.",
  //     author: "cooluser",
  //     createdAt: "2025-04-29T12:00:00Z",
  //     actions: [
  //       {
  //         id: 1,
  //         type: "comment",
  //         createdAt: "2025-04-29T12:30:00Z",
  //         author: "someuser",
  //         text: "Really interesting concept.",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Follow-up Idea",
  //     body: "This post builds on the first one.",
  //     author: "otheruser",
  //     createdAt: "2025-04-29T13:00:00Z",
  //     relationships: [
  //       {
  //         type: "dependsOn",
  //         post: {
  //           id: 1,
  //           title: "Foundational Concept",
  //           author: "cooluser",
  //         },
  //       },
  //     ],
  //     actions: [
  //       {
  //         id: 1,
  //         type: "comment",
  //         createdAt: "2025-04-29T13:15:00Z",
  //         author: "anotheruser",
  //         text: "This ties it together nicely.",
  //       },
  //       {
  //         id: 2,
  //         type: "relationshipProposal",
  //         createdAt: "2025-04-29T13:20:00Z",
  //         author: "proposer123",
  //         relationshipType: "dependsOn",
  //         targetPost: {
  //           id: 1,
  //           title: "Foundational Concept",
  //           author: "cooluser",
  //         },
  //         votes: 2,
  //       },
  //     ],
  //   },
  // ]);



  // useEffect(() => { // previous, for single post--replacing with multi via loadInitialPosts
  //   const loadPost = async () => {
  //     try {
  //       const post = await fetchPostDTO(2); // change this ID if needed
  //       setPosts([post]); // just load one for now
  //     } catch (err) {
  //       console.error("Failed to load post DTO:", err);
  //     }
  //   };
  
  //   loadPost();
  // }, []);

  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPaginatedPosts(0); // page 0
        setPosts(data.content);
        setHasMore(!data.last);
        setPage(1); // next page
      } catch (err) {
        console.error("Failed to load initial posts", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadInitialPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
  
      if (nearBottom && hasMore && !isLoading) {
        loadMorePosts();
      }
    };
  
    const loadMorePosts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPaginatedPosts(page);
        setPosts(prev => [...prev, ...data.content]);
        setHasMore(!data.last);
        setPage(prev => prev + 1);
      } catch (err) {
        console.error("Failed to load more posts", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore, isLoading]);  
  

  useEffect(() => { // old
    async function loadVotes() {
      try {
        const voteList = await fetchMyVotes(); // from api.ts
        const voteMap: Record<number, number> = {};
  
        voteList.forEach((vote) => {
          voteMap[vote.actionId] = vote.voteValue;
        });
  
        setUserVotes(voteMap);
      } catch (err) {
        console.error("❌ Failed to load user votes", err);
      }
    }
  
    loadVotes();
  }, []);

  // useEffect(() => { // new -- functionally equivalent to old
  //   const loadVotes = async () => {
  //     try {
  //       const voteRes = await fetchMyVotes();
  //       const voteMap: Record<number, number> = {};
  //       voteRes.forEach(v => {
  //         voteMap[v.actionId] = v.voteValue;
  //       });
  //       setUserVotes(voteMap);
  //     } catch (err) {
  //       console.error("Failed to load votes", err);
  //     }
  //   };
  
  //   loadVotes();
  // }, []);
  

  // const handleCreatePost = ( // old createPost--mocks on frontend but does not actually create
  //   title: string,
  //   body: string,
  //   relationships?: {
  //     type: PostRelationshipType;
  //     post: { id: number; title: string; author: string };
  //   }[]
  // ) => {
  //   const newPost: PostType = {
  //     id: posts.length + 1,
  //     title,
  //     body,
  //     author: "currentuser",
  //     createdAt: new Date().toISOString(),
  //     actions: [],
  //     relationships,
  //   };    
  
  //   setPosts([newPost, ...posts]);
  // };

  const handleCreatePost = async (
    title: string,
    body: string,
    relationships?: {
      type: PostRelationshipKindType;
      post: { id: number; title: string; author: string };
    }[]
  ) => {
    try {
      const relationshipPayload = relationships?.map(rel => ({
        type: rel.type,
        post: { id: rel.post.id },
      }));
  
      const newPost = await createPostAPI({
        title,
        body: body,
        relationships: relationshipPayload,
      });
  
      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Post creation failed");
    }
  };  

  const handleAddComment = (postId: number, text: string) => {
    const newComment = {
      id: Date.now(), // simple unique id
      type: "comment" as const,
      author: "currentuser", // TODO: replace with actual auth user
      text,
      createdAt: new Date().toISOString(),
    };
  
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              actions: [...post.actions, newComment],
            }
          : post
      )
    );
  };
  

  const handleProposeRelationship = async (
    postId: number,
    relationshipType: PostRelationshipKindType,
    targetPostId: number
  ) => {
    try {
      const newAction: RelationshipProposalActionType = await proposeRelationship({
        postId,
        relationshipType,
        targetPostId
      });

      setRelationshipError(null); // Clear error on success

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ?  { ...post, actions: [...post.actions, newAction] } : post
        )
      );
    } catch (err: any) {
      console.error("Failed to propose relationship:", err);
    
      if (err instanceof Error) {
        setRelationshipError(err.message);
      } else {
        setRelationshipError("Relationship proposal failed.");
      }
    }
  };

  const handleProposeRelationship_original_hardcoded = (
    postId: number,
    relationshipType: PostRelationshipKindType,
    targetPostId: number
  ) => {
    const targetPost = posts.find((p) => p.id === targetPostId);
    if (!targetPost) {
      alert("Target post not found.");
      return;
    }
  
    const newProposal = {
      id: Date.now(), // unique
      type: "relationshipProposal" as const,
      author: "currentuser", // later: get from auth
      createdAt: new Date().toISOString(),
      relationshipType,
      targetPost: {
        id: targetPost.id,
        title: targetPost.title,
        author: targetPost.author,
      },
      votes: 0,
    };
  
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              actions: [...post.actions, newProposal],
            }
          : post
      )
    );
  };

  const handleVote = async (postId: number, actionId: number, delta: number) => {
    const currentVote = userVotes[actionId] || 0;
    const newVote = currentVote === delta ? 0 : delta;
  
    try {
      const result = await voteOnActionAPI(actionId, newVote); // send updated vote to backend
  
      setUserVotes(prev => ({ ...prev, [actionId]: result.voteValue }));
  
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id !== postId) return post;
          return {
            ...post,
            actions: post.actions.map(action =>
              action.type === "relationshipProposal" && action.id === actionId
                ? { ...action, votes: result.newTotalVotes } // ✅ use backend count
                : action
            ),
          };
        })
      );
    } catch (error) {
      alert("Vote failed. Try again.");
      console.error(error);
    }
  };
  
  return (
      <div className="w-full max-w-4xl mx-auto">
        <NewPostForm onCreatePost={handleCreatePost} posts={posts} />

        <PostList
          posts={posts}
          onAddComment={handleAddComment}
          onProposeRelationship={handleProposeRelationship}
          onVote={handleVote}
          userVotes={userVotes}
          relationshipError={relationshipError}
          setRelationshipError={setRelationshipError}
        />
        {isLoading && <p className="text-center my-4">Loading more posts...</p>}
        {!hasMore && <p className="text-center my-4 text-gray-500">You've reached the end.</p>}
      </div>
  );
};

export default Home;