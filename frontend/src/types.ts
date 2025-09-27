export type PostRelationshipKindType = "dependsOn" | "contradicts" | "rephrases";

export const RELATIONSHIP_KINDS: PostRelationshipKindType[] = [
    "dependsOn",
    "contradicts",
    "rephrases",
];

export const RELATIONSHIP_LABELS: Record<PostRelationshipKindType, string> = {
dependsOn: "Depends On",
contradicts: "Contradicts",
rephrases: "Rephrases",
};

export interface PostReferenceType {
  id: number;
  title: string;
  author: string;
}

export type PostActionkindType = "comment" | "relationshipProposal";

export interface BaseActionType {
  id: number;
  type: PostActionkindType;
  createdAt: string;
  author: string;
}

export interface CommentActionType extends BaseActionType {
  type: "comment";
  text: string;
}

export interface RelationshipProposalActionType extends BaseActionType {
  type: "relationshipProposal";
  relationshipType: PostRelationshipKindType;
  targetPost: PostReferenceType;
  votes: number;
}

export type PostActionType = CommentActionType | RelationshipProposalActionType;

export interface PostType {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  actions: PostActionType[]; // ✅ unified action stream
  relationships?: {
    type: PostRelationshipKindType;
    post: PostReferenceType;
  }[];
}
