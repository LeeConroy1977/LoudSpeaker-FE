import React, { createContext, useRef } from "react";

export const CommentScrollContext = createContext();

export const CommentScrollProvider = ({ children }) => {
  const commentsRef = useRef(null);

  const handleScrollToTop = () => {
    if (commentsRef.current) {
      const rect = commentsRef.current.getBoundingClientRect();
      const topOffset = rect.top + window.pageYOffset - 400;

      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <CommentScrollContext.Provider value={{ handleScrollToTop, commentsRef }}>
      {children}
    </CommentScrollContext.Provider>
  );
};
