import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentSection from "./CommentSection";
import { PostType, PostRelationshipType } from "../types";

interface PostProps {
  post: PostType;
  onAddComment: (postId: number, text: string) => void;
  onProposeRelationship: (
    postId: number,
    relationshipType: PostRelationshipType,
    targetPostId: number
  ) => void;
  onVote: (postId: number, actionId: number, delta: number) => void;
}


const Post = ({ post, onAddComment, onProposeRelationship, onVote }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const authContext = useContext(AuthContext);

  return (
    <div className="bg-[var(--color-soft)] text-[var(--color-text)] rounded-(--border-radii) shadow-md p-6">
      {/* 📎 Relationships Block */}
      {post.relationships && post.relationships.length > 0 && (
        <div className="mb-4 space-y-2">
          {post.relationships.map((rel, index) => (
            <div
              key={index}
              className="p-3 rounded bg-[var(--color-bg)] border-l-4 border-[var(--color-accent)]"
            >
              <p className="text-xs text-gray-500 mb-1 capitalize">
                {rel.type.replace(/([A-Z])/g, " $1")}:
              </p>
              <div className="text-sm italic text-[var(--color-text)]">
                <strong>{rel.post.author}</strong>: {rel.post.title}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📋 Post Metadata */}
      <div className="text-xs opacity-50 flex items-center gap-2 mb-2">
        ID: {post.id}
        <button
          onClick={() => navigator.clipboard.writeText(post.id.toString())}
          className="text-blue-500 hover:underline text-xs"
        >
          Copy
        </button>
      </div>

      <h2 className="text-xl font-(--font-weight-header) mb-2">{post.title}</h2>
      <p className="mb-2">{post.body}</p>
      <p className="text-sm opacity-60 mb-4">
        Posted by {post.author} on {new Date(post.createdAt).toLocaleString()}
      </p>

      {/* 💬 Comment/Action Toggle */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-[var(--color-accent)] font-semibold"
      >
        {showComments ? "Hide" : "Show"} Comments ({post.actions.length})
      </button>

      {/* 💬 Actions Section */}
      {showComments && (
        <div className="mt-4">
          <CommentSection
            actions={post.actions}
            postId={post.id}
            onAddComment={onAddComment}
            onProposeRelationship={onProposeRelationship}
            onVote={onVote}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
