import React, { useContext } from "react";
import ArticleCommentsCard from "./ArticleCommentsCard";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";

const ArticleCommentsList = () => {
  const { comments } = useContext(ArticleCommentsContext);
  return (
    <div className="mb-4">
      {comments.map((comment) => {
        return (
          <ArticleCommentsCard key={comment.comment_id} comment={comment} />
        );
      })}
    </div>
  );
};

export default ArticleCommentsList;
