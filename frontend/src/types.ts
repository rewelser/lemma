export type PostRelationshipType = "dependsOn" | "contradicts" | "rephrases";

export const RELATIONSHIP_TYPES: PostRelationshipType[] = [
    "dependsOn",
    "contradicts",
    "rephrases",
];

export const RELATIONSHIP_LABELS: Record<PostRelationshipType, string> = {
dependsOn: "Depends On",
contradicts: "Contradicts",
rephrases: "Rephrases",
};

export interface PostReference {
  id: number;
  title: string;
  author: string;
}

export type PostActionType = "comment" | "relationshipProposal";

export interface BaseAction {
  id: number;
  type: PostActionType;
  createdAt: string;
  author: string;
}

export interface CommentAction extends BaseAction {
  type: "comment";
  text: string;
}

export interface RelationshipProposalAction extends BaseAction {
  type: "relationshipProposal";
  relationshipType: PostRelationshipType;
  targetPost: PostReference;
  votes: number;
}

export type PostAction = CommentAction | RelationshipProposalAction;

export interface PostType {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  actions: PostAction[]; // ✅ unified action stream
  relationships?: {
    type: PostRelationshipType;
    post: PostReference;
  }[];
}
