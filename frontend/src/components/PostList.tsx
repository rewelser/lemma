import Post from "./Post";
import { PostType, PostRelationshipKindType } from "../types";

interface PostListProps {
  posts: PostType[];
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

const PostList = ({ posts, onAddComment, onProposeRelationship, onVote, userVotes, relationshipError, setRelationshipError }: PostListProps) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Post 
          key={post.id} 
          post={post} 
          onAddComment={onAddComment} 
          onProposeRelationship={onProposeRelationship} 
          onVote={onVote} 
          userVotes={userVotes} 
          relationshipError={relationshipError}
          setRelationshipError={setRelationshipError}
        />
      ))}
    </div>
  );
};

export default PostList;
