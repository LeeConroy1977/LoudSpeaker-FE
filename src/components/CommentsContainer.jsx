import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";

const CommentsContainer = ({
  comments,
  commentStyle,
  commentsNumStyle,
  commentsIconStyle,
}) => {
  return (
    <div className={`${commentStyle} flex items-center rounded-xl`}>
      <span>
        <FaRegCommentAlt className={`${commentsIconStyle} font-bold`} />
      </span>
      <p className={`${commentsNumStyle} `}>{comments}</p>
    </div>
  );
};

export default CommentsContainer;
