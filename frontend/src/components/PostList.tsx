import Post from "./Post";

interface PostListProps {
  posts: {
    id: number;
    title: string;
    body: string;
    author: string;
    createdAt: string;
    comments: {
      id: number;
      author: string;
      text: string;
      createdAt: string;
    }[];
  }[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
