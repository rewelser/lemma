import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, Post } from "../api";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetchPostById(Number(id)).then(setPost);
    }
  }, [id]);

  return (
    <div className="p-6">
      {post ? (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p>{post.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetail;
