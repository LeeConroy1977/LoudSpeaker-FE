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
      {comments?.map((comment) => {
        return (
          <ArticleCommentsCard key={comment?.comment_id} comment={comment} />
        );
      })}
    </div>
  );
};

export default ArticleCommentsList;
