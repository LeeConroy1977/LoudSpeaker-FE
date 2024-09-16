import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";

const CommentsContainer = ({
  commentStyle,
  commentsNumStyle,
  commentsIconStyle,
  commentCount,
}) => {
  return (
    <div className={`${commentStyle} flex items-center rounded-xl`}>
      <span>
        <FaRegCommentAlt className={`${commentsIconStyle} font-bold`} />
      </span>
      <p className={`${commentsNumStyle} `}>{commentCount}</p>
    </div>
  );
};

export default CommentsContainer;
