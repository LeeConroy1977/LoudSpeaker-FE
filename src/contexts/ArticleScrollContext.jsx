import React, { createContext, useRef } from "react";

// Create the ScrollContext
export const ArticleScrollContext = createContext();

export const ArticleScrollProvider = ({ children }) => {
  const articlesRef = useRef(null);

  // Define the scroll-to-top function
  const handleScrollToTop = () => {
    console.log("Scrolling to:", articlesRef.current);
    if (articlesRef.current) {
      articlesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <ArticleScrollContext.Provider value={{ handleScrollToTop, articlesRef }}>
      {children}
    </ArticleScrollContext.Provider>
  );
};
