import { createContext, useState } from "react";

export const ArticleCommentsContext = createContext();

export const ArticleCommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  return (
    <ArticleCommentsContext.Provider value={{ comments, setComments }}>
      {children}
    </ArticleCommentsContext.Provider>
  );
};
