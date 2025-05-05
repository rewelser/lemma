export type PostRelationshipType = "dependsOn" | "contradicts" | "rephrases";



export interface CommentType {
    id: number;
    author: string;
    text: string;
    createdAt: string;
}

export interface PostReference {
    id: number;
    title: string;
    author: string;
}
  
export interface PostType {
    id: number;
    title: string;
    body: string;
    author: string;
    createdAt: string;
    comments: CommentType[];
    relationships?: {
      type: PostRelationshipType;
      post: PostReference;
    }[];
  }