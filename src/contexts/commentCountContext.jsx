import { createContext, useContext, useState } from "react";

export const CommentCountContext = createContext();

export const CommentCountProvider = ({ children }) => {
  const [commentCount, setCommentCount] = useState(null);

  return (
    <CommentCountContext.Provider value={{ commentCount, setCommentCount }}>
      {children}
    </CommentCountContext.Provider>
  );
};
