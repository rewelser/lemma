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
  onVote: (postId: number, actionId: number, delta: number) => void;
}

const PostList = ({ posts, onAddComment, onProposeRelationship, onVote }: PostListProps) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} onAddComment={onAddComment} onProposeRelationship={onProposeRelationship} onVote={onVote} />
      ))}
    </div>
  );
};

export default PostList;
