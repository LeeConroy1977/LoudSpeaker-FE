import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";

const CommentsContainer = ({
  commentStyle,
  commentsNumStyle,
  commentsIconStyle,
  comment_count = 123,
}) => {
  return (
    <div className={`${commentStyle} flex items-center rounded-xl`}>
      <span>
        <FaRegCommentAlt className={`${commentsIconStyle} font-bold`} />
      </span>
      <p className={`${commentsNumStyle} `}>{comment_count}</p>
    </div>
  );
};

export default CommentsContainer;
