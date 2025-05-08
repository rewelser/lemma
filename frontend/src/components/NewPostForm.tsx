import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { PostType, PostRelationshipType, RELATIONSHIP_TYPES, RELATIONSHIP_LABELS } from "../types";

interface NewPostFormProps {
  onCreatePost: (
    title: string,
    body: string,
    relationships?: {
      type: PostRelationshipType;
      post: { id: number; title: string; author: string };
    }[]
  ) => void;
  posts: PostType[]; // pass all existing posts so user can pick one
}

const NewPostForm = ({ onCreatePost, posts }: NewPostFormProps) => {
  const { isAuthenticated } = useContext(AuthContext)!;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedType, setSelectedType] = useState<PostRelationshipType>("dependsOn");
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>();
  const [relationships, setRelationships] = useState<
    { type: PostRelationshipType; post: { id: number; title: string; author: string } }[]
  >([]);

  const handleAddRelationship = () => {
    if (!selectedPostId) return;

    const targetPost = posts.find((p) => p.id === selectedPostId);
    if (!targetPost) return;

    const newRel = {
      type: selectedType,
      post: { id: targetPost.id, title: targetPost.title, author: targetPost.author },
    };

    // Prevent duplicates
    const alreadyExists = relationships.some(
      (rel) => rel.type === newRel.type && rel.post.id === newRel.post.id
    );
    if (!alreadyExists) {
      setRelationships([...relationships, newRel]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Title and body cannot be empty.");
      return;
    }

    onCreatePost(title.trim(), body.trim(), relationships);
    setTitle("");
    setBody("");
    setRelationships([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="mb-6 text-center text-sm text-[var(--color-text)]">
        <p>
          <span className="text-[var(--color-accent)] font-bold">Login</span> to create a post!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--color-soft)] p-4 rounded-(--border-radii) shadow-md mb-8"
    >
      <h2 className="text-xl font-(--font-weight-header) mb-4 text-[var(--color-text)]">
        Create a New Post
      </h2>

      <InputField
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextAreaField
        placeholder="What's on your mind?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {/* 🔗 Add relationship UI */}
      <div className="mt-4 space-y-2">
        <div className="flex gap-2 items-center">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as PostRelationshipType)}
            className="p-2 border rounded text-black"
          >
            {RELATIONSHIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {RELATIONSHIP_LABELS[type]}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={selectedPostId ?? ""}
            onChange={(e) => setSelectedPostId(Number(e.target.value))}
            className="p-2 border rounded text-black"
            placeholder="Enter Post ID"
          />
          <button
            type="button"
            onClick={handleAddRelationship}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>

        {/* Show selected relationships */}
        {relationships.length > 0 && (
          <div className="mt-2 text-sm">
            <p className="mb-1 font-semibold text-[var(--color-text)]">Linked Posts:</p>
            <ul className="list-disc ml-4">
              {relationships.map((rel, i) => (
                <li key={i}>
                  <span className="capitalize">{rel.type}</span>:{" "}
                  <strong>{rel.post.title}</strong> by {rel.post.author}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-[var(--color-controls)] hover:bg-[var(--color-controls-hover)] text-white font-bold py-2 px-4 rounded mt-4"
      >
        Post
      </button>
    </form>
  );
};

export default NewPostForm;
