import React, { useState } from "react";
import ArticleCommentsCard from "./ArticleCommentsCard";
import ArticleComments from "../../data/comments";

const ArticleCommentsList = ({ author }) => {
  const [comments, setComments] = useState(ArticleComments);

  const filteredComments = comments.filter(
    (comments) => comments.author === author
  );
  console.log(filteredComments);
  return (
    <div>
      {filteredComments.map((comment) => {
        return (
          <ArticleCommentsCard
            key={comment.body}
            comment={comment}
            author={author}
          />
        );
      })}
    </div>
  );
};

export default ArticleCommentsList;
