import { createContext, useState } from "react";

export const MainArticleContext = createContext();

export const MainArticleProvider = ({ children }) => {
  const [article, setArticle] = useState({});

  return (
    <MainArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </MainArticleContext.Provider>
  );
};
