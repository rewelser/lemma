import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentSection from "./CommentSection";
import TextAreaField from "./TextAreaField";
import PrimaryButton from "../components/PrimaryButton";
import BaseButton from "../components/BaseButton";
import { PostType } from "../types";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  const authContext = useContext(AuthContext);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authContext?.isAuthenticated) {
      alert("You must be logged in to comment!");
      return;
    }
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const newCommentObject = {
      id: comments.length + 1,
      author: "currentuser", // TODO: pull actual username later
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newCommentObject]);
    setNewComment("");
  };

  return (
    <div className="bg-[var(--color-soft)] text-[var(--color-text)] rounded-(--border-radii) shadow-md p-6">
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

      <button
        onClick={() => setShowComments(!showComments)}
        className="text-[var(--color-accent)] font-semibold"
      >
        {showComments ? "Hide" : "Show"} Comments ({comments.length})
      </button>

      {showComments && (
        <div className="mt-4">
          <CommentSection comments={comments} />

          {/* 📝 New Comment Input */}
          {authContext?.isAuthenticated && (
            <form onSubmit={handleAddComment} className="mt-4">
              <TextAreaField
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                maxLength={280}
                showCharCount={true}
              />
              {/* <button
                type="submit"
                className="bg-[var(--color-controls)] hover:bg-[var(--color-controls-hover)] text-[var(--color-text-alt)] font-bold py-2 px-4 rounded mt-2"
              >
                Submit Comment
              </button> */}
            <BaseButton 
                type="submit"
                className="mt-2 py-2 px-4">
                Submit Comment
            </BaseButton>
            <PrimaryButton 
                text="Submit Comment" 
                type="submit"
                className="mt-2 py-2 px-4"
            />
            </form>
          )}

          {!authContext?.isAuthenticated && (
            <p className="text-sm text-center mt-4">
              <span className="text-[var(--color-accent)] font-semibold">
                Login
              </span>{" "}
              to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
