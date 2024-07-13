import React, { useContext } from "react";
import ArticleCommentsCard from "./ArticleCommentsCard";
import { ArticleCommentsContext } from "../contexts/ArticleCommentsContext";

const ArticleCommentsList = ({ setDeletedCommentId }) => {
  const { comments } = useContext(ArticleCommentsContext);
  return (
    <div>
      {comments.map((comment) => {
        return (
          <ArticleCommentsCard
            key={comment.comment_id}
            comment={comment}
            setDeletedCommentId={setDeletedCommentId}
          />
        );
      })}
    </div>
  );
};

export default ArticleCommentsList;
