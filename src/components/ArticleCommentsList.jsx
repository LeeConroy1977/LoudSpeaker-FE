import React, { useContext } from "react";
import ArticleCommentsCard from "./ArticleCommentsCard";
import { CommentScrollContext } from "../contexts/CommentScrollContext";
import { CommentsContext } from "../contexts/CommentsContext";

const ArticleCommentsList = () => {
  const {
    state: { comments },
  } = useContext(CommentsContext);
  const { commentsRef } = useContext(CommentScrollContext);

  return (
    <div ref={commentsRef} className="mb-4">
      {Array.isArray(comments) &&
        comments?.map((comment, i) => {
          return <ArticleCommentsCard key={i} comment={comment} />;
        })}
    </div>
  );
};

export default ArticleCommentsList;
