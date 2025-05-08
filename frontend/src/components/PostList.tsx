import Post from "./Post";
import { PostType, PostRelationshipType } from "../types";

interface PostListProps {
  posts: PostType[];
  onAddComment: (postId: number, text: string) => void;
  onProposeRelationship: (
    postId: number,
    relationshipType: PostRelationshipType,
    targetPostId: number
  ) => void;
}

const PostList = ({ posts, onAddComment, onProposeRelationship }: PostListProps) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} onAddComment={onAddComment} onProposeRelationship={onProposeRelationship} />
      ))}
    </div>
  );
};

export default PostList;
