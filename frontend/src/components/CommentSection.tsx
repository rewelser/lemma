interface CommentSectionProps {
    comments: {
      id: number;
      author: string;
      text: string;
      createdAt: string;
    }[];
  }
  
  const CommentSection = ({ comments }: CommentSectionProps) => {
    return (
      <div className="mt-4 space-y-4">
        {comments.length === 0 ? (
          <p className="opacity-30">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-l-4 border-[var(--color-accent)] pl-4">
              <p className="text-sm font-semibold">{comment.author}</p>
              <p className="text-sm">{comment.text}</p>
              <p className="text-xs opacity-60">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default CommentSection;
  