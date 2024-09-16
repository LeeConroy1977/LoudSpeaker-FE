import React, { createContext, useRef } from "react";

// Create the ScrollContext
export const CommentScrollContext = createContext();

export const CommentScrollProvider = ({ children }) => {
  const commentsRef = useRef(null);

  // Define the scroll-to-top function
  const handleScrollToTop = () => {
    if (commentsRef.current) {
      // Get the position of the commentsRef
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
