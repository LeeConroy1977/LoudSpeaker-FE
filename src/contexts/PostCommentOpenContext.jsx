import { createContext, useState } from "react";

export const PostCommentOpenContext = createContext();

export const PostCommentOpenProvider = ({ children }) => {
  const [isPostCommentOpen, setIsPostCommentOpen] = useState(false);

  return (
    <PostCommentOpenContext.Provider
      value={{ isPostCommentOpen, setIsPostCommentOpen }}
    >
      {children}
    </PostCommentOpenContext.Provider>
  );
};
