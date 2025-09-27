import { API_BASE_URL } from "./config";
import { PostType, RelationshipProposalActionType } from "./types";

// Define a TypeScript interface for a post
export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page index
  first: boolean;
  last: boolean;
}

// where authFetch was
export const authFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const token = localStorage.getItem("token");
  const headers = {
    ...init?.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(input, { ...init, headers });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return Promise.reject(new Error("Unauthorized"));
  }
  return res;
};

// Fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
    const response = await authFetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
};

// Fetch a single post by ID
export const fetchPostById = async (id: number): Promise<Post> => {
    const response = await authFetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    return response.json();
};

// Fetch post with actions + votes, fully shaped for UI
export const fetchPostDTO = async (postId: number): Promise<PostType> => {
    const token = localStorage.getItem("token");
    const response = await authFetch(`http://localhost:8080/posts/${postId}/dto`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch post DTO");
    }
  
    return response.json();
};

export async function fetchPaginatedPosts(page: number = 0, size: number = 10): Promise<Page<PostType>> {
    const token = localStorage.getItem("token");

    const response = await authFetch(`${API_BASE_URL}/posts/dto?page=${page}&size=${size}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch paginated posts");
    }

    return response.json(); // returns Page<PostType>
}
  

// Create a new post
export const createPost = async (
  postData: {
    title: string;
    body: string;
    relationships?: {
      type: string;
      post: { id: number };
    }[];
  }
): Promise<PostType> => {
  const token = localStorage.getItem("token");
  const response = await authFetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) throw new Error("Failed to create post");

  return response.json();
};

export const proposeRelationship = async ({
  postId,
  targetPostId,
  relationshipType,
}: {
  postId: number;
  targetPostId: number;
  relationshipType: string;
}): Promise<RelationshipProposalActionType> => {
  const token = localStorage.getItem("token");
  const response = await authFetch(`${API_BASE_URL}/posts/propose-relationship`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postId,
      targetPostId,
      relationshipType,
    }),
  });

  if (!response.ok) throw new Error("Failed to propose relationship");

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
    console.log("frog");
    const token = localStorage.getItem("token");
    const response = await authFetch(`${API_BASE_URL}/posts/vote`, {
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
    const response = await authFetch(`${API_BASE_URL}/posts/my-votes`, {
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