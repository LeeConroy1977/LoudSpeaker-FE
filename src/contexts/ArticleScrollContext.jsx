import React, { createContext, useRef } from "react";

export const ArticleScrollContext = createContext();

export const ArticleScrollProvider = ({ children }) => {
  const articlesRef = useRef(null);

  const handleScrollToTop = () => {
    if (articlesRef.current) {
      articlesRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      console.error("articlesRef reference is not defined");
    }
  };

  return (
    <ArticleScrollContext.Provider value={{ handleScrollToTop, articlesRef }}>
      {children}
    </ArticleScrollContext.Provider>
  );
};
