import React, { useContext } from "react";
import ArticleCommentsCard from "./ArticleCommentsCard";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";
import { CommentScrollContext } from "../contexts/CommentScrollContext";

const ArticleCommentsList = () => {
  const { comments } = useContext(ArticleCommentsContext);
  const { commentsRef } = useContext(CommentScrollContext);
  return (
    <div ref={commentsRef} className="mb-4">
      {comments.map((comment) => {
        return (
          <ArticleCommentsCard key={comment.comment_id} comment={comment} />
        );
      })}
    </div>
  );
};

export default ArticleCommentsList;
