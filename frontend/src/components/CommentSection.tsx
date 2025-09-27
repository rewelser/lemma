import { useState, useContext } from "react";
import { PostActionType, PostRelationshipKindType, RELATIONSHIP_KINDS, RELATIONSHIP_LABELS } from "../types";
import TextAreaField from "./TextAreaField";
import PrimaryButton from "./PrimaryButton";
import { AuthContext } from "../context/AuthContext";
import DismissibleError from "./DismissibleError";

interface CommentSectionProps {
  actions: PostActionType[];
  postId: number;
  onAddComment: (postId: number, text: string) => void;
  onProposeRelationship: (
    postId: number,
    relationshipType: PostRelationshipKindType,
    targetPostId: number
  ) => void;
  onVote: (postId: number, actionId: number, delta: number) => void;
  userVotes: Record<number, number>;
  relationshipError?: string | null;
  setRelationshipError?: (msg: string | null) => void;
}


const CommentSection = ({ actions, postId, onAddComment, onProposeRelationship, onVote, userVotes, relationshipError, setRelationshipError }: CommentSectionProps) => {
  const { isAuthenticated } = useContext(AuthContext)!;
  const [newComment, setNewComment] = useState("");
  const [relType, setRelType] = useState<PostRelationshipKindType>("dependsOn");
  const [relTargetId, setRelTargetId] = useState("");
  // const [relationshipError, setRelationshipError] = useState<string | null>(null);

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

  const handleVote = (actionId: number, delta: number) => {
    onVote(postId, actionId, delta);
  };

  return (
    <div className="space-y-4">
      {actions.length === 0 ? (
        <p className="opacity-30">No comments or activity yet.</p>
      ) : (
        actions.map((action) => {
          console.log("Action type:", action.type);
          if (action.type === "comment") {
            console.log("Rendering a comment:", action);
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
            const voteState = userVotes[action.id] ?? 0;
            console.log(action);
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
                <div className="text-xs mt-1 flex items-center gap-3">
                <button
                  onClick={() => handleVote(action.id, 1)}
                  className={`hover:text-green-600 font-bold ${voteState === 1 ? "text-green-500" : ""}`}
                >
                  👍
                </button>
                <span>{action.votes}</span>
                <button
                  onClick={() => handleVote(action.id, -1)}
                  className={`hover:text-red-600 font-bold ${voteState === -1 ? "text-red-500" : ""}`}
                >
                  👎
                </button>
                </div>
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
            onChange={(e) => setRelType(e.target.value as PostRelationshipKindType)}
            className="border p-2 w-full mb-2 rounded text-black"
          >
            {RELATIONSHIP_KINDS.map((type) => (
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
          {/* {relationshipError && (
            <p className="text-red-500 text-sm mt-2">{relationshipError}</p>
          )} */}
          <DismissibleError
            message={relationshipError ?? null}
            onDismiss={() => setRelationshipError?.(null)}
          />
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
