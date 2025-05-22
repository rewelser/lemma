import { API_BASE_URL } from "./config";
import { PostType } from "./types";

// Define a TypeScript interface for a post
export interface Post {
  id: number;
  title: string;
  description: string;
}

// Fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
};

// Fetch a single post by ID
export const fetchPostById = async (id: number): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    return response.json();
};

// Fetch post with actions + votes, fully shaped for UI
export const fetchPostDTO = async (postId: number): Promise<PostType> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/posts/${postId}/dto`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch post DTO");
    }
  
    return response.json();
};
  

// Create a new post
export const createPost = async (postData: Omit<Post, "id">): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error("Failed to create post");
    return response.json();
};

// export async function voteOnAction(postId: number, actionId: number, delta: number) {
//     const token = localStorage.getItem("token");
//     const response = await fetch(`/api/posts/${postId}/actions/${actionId}/vote?delta=${delta}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   }

  export async function voteOnAction(actionId: number, delta: number): Promise<{ voteValue: number, actionId: number, newTotalVotes: number }> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/posts/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ actionId, delta }),
    });
  
    if (!response.ok) {
      throw new Error("Vote failed");
    }
  
    return response.json();
  }

  export interface VoteResponse {
    id: number;
    voteValue: number;
    actionId: number;
    createdAt: string;
  }

  export async function fetchMyVotes(): Promise<VoteResponse[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/posts/my-votes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user votes");
    }
  
    return response.json();
  }
  
  
