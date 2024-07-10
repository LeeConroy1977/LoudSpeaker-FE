import React, { useState } from "react";
import ArticleCommentsCard from "./ArticleCommentsCard";
import ArticleComments from "../../data/comments";

const ArticleCommentsList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <ArticleCommentsCard key={comment.comment_id} comment={comment} />
        );
      })}
    </div>
  );
};

export default ArticleCommentsList;
