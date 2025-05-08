import { useState, useContext } from "react";
import { PostAction, PostRelationshipType, RELATIONSHIP_TYPES, RELATIONSHIP_LABELS } from "../types";
import TextAreaField from "./TextAreaField";
import PrimaryButton from "./PrimaryButton";
import { AuthContext } from "../context/AuthContext";

interface CommentSectionProps {
  actions: PostAction[];
  postId: number;
  onAddComment: (postId: number, text: string) => void;
  onProposeRelationship: (
    postId: number,
    relationshipType: PostRelationshipType,
    targetPostId: number
  ) => void;
}

const CommentSection = ({ actions, postId, onAddComment, onProposeRelationship }: CommentSectionProps) => {
  const { isAuthenticated } = useContext(AuthContext)!;
  const [newComment, setNewComment] = useState("");
  const [relType, setRelType] = useState<PostRelationshipType>("dependsOn");
const [relTargetId, setRelTargetId] = useState("");


  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    // TODO: actually add this to parent post’s state
    console.log("Submit new comment:", newComment, "for post", postId);
    onAddComment(postId, newComment);
    setNewComment("");
  };

  return (
    <div className="space-y-4">
      {actions.length === 0 ? (
        <p className="opacity-30">No comments or activity yet.</p>
      ) : (
        actions.map((action) => {
          if (action.type === "comment") {
            return (
              <div
                key={action.id}
                className="border-l-4 border-[var(--color-accent)] pl-4"
              >
                <p className="text-sm font-semibold">{action.author}</p>
                <p className="text-sm">{action.text}</p>
                <p className="text-xs opacity-60">
                  {new Date(action.createdAt).toLocaleString()}
                </p>
              </div>
            );
          }

          if (action.type === "relationshipProposal") {
            return (
              <div
                key={action.id}
                className="border-l-4 border-[var(--color-controls)] pl-4 bg-[var(--color-bg)]"
              >
                <p className="text-sm">
                  <strong>{action.author}</strong> proposed a{" "}
                  <span className="capitalize">{action.relationshipType}</span>{" "}
                  relationship to: <em>{action.targetPost.title}</em>
                </p>
                <p className="text-xs opacity-60">
                  {new Date(action.createdAt).toLocaleString()}
                </p>
                <p className="text-xs mt-1">
                  👍 {action.votes} {/* voting system to be added */}
                </p>
              </div>
            );
          }

          return null;
        })
      )}

      {/* 💬 New Comment Form */}
      {isAuthenticated && (
        <form onSubmit={handleAddComment} className="pt-2">
          <TextAreaField
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            maxLength={280}
            showCharCount
          />
          <PrimaryButton text="Submit Comment" type="submit" className="mt-2" />
        </form>
      )}

      {isAuthenticated && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!relTargetId) return alert("Target Post ID required");
            onProposeRelationship(postId, relType, Number(relTargetId));
            setRelTargetId("");
          }}
          className="pt-4 border-t border-[var(--color-soft)] mt-4"
        >
          <label className="block text-sm font-semibold mb-1">
            Propose Relationship
          </label>
          <select
            value={relType}
            onChange={(e) => setRelType(e.target.value as PostRelationshipType)}
            className="border p-2 w-full mb-2 rounded text-black"
          >
            {RELATIONSHIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {RELATIONSHIP_LABELS[type]}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Target Post ID"
            value={relTargetId}
            onChange={(e) => setRelTargetId(e.target.value)}
            className="border p-2 w-full mb-2 rounded text-black"
          />
          <PrimaryButton type="submit" text="Propose" className="w-full" />
        </form>
      )}


      {!isAuthenticated && (
        <p className="text-sm text-center mt-2 text-[var(--color-text)]">
          <span className="text-[var(--color-accent)] font-semibold">
            Login
          </span>{" "}
          to comment or propose relationships.
        </p>
      )}
    </div>
  );
};

export default CommentSection;
