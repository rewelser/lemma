import PostList from "../components/PostList";
import NewPostForm from "../components/NewPostForm";
import { useState } from "react";
import { PostType, PostRelationshipType } from "../types";

const Home: React.FC = () => {

  const [posts, setPosts] = useState<PostType[]>([
    {
      id: 1,
      title: "Foundational Concept",
      body: "This is the body of the first post.",
      author: "cooluser",
      createdAt: "2025-04-29T12:00:00Z",
      comments: [],
    },
    {
      id: 2,
      title: "Follow-up Idea",
      body: "This post builds on the first one.",
      author: "otheruser",
      createdAt: "2025-04-29T13:00:00Z",
      comments: [],
      relationships: [
        {
          type: "dependsOn",
          post: {
            id: 1,
            title: "Foundational Concept",
            author: "cooluser",
          },
        },
      ],
    },
  ]);

  const handleCreatePost = (
    title: string,
    body: string,
    relationships?: {
      type: PostRelationshipType;
      post: { id: number; title: string; author: string };
    }[]
  ) => {
    const newPost: PostType = {
      id: posts.length + 1,
      title,
      body,
      author: "currentuser",
      createdAt: new Date().toISOString(),
      comments: [],
      relationships,
    };
  
    setPosts([newPost, ...posts]);
  };

  return (
      <div className="w-full max-w-4xl mx-auto">
        <NewPostForm onCreatePost={handleCreatePost} posts={posts} />

        <PostList posts={posts} />
      </div>
  );
};

export default Home;