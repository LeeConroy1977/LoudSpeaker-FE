import React, { createContext, useState, useContext, useCallback } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  // Initialize the loading states with default values
  const [loadingStates, setLoadingStates] = useState({
    article: false,
    mainArticle: false,
    featuredArticles: false,
  });

  // Memoize setLoading function to avoid unnecessary re-renders
  const setLoading = useCallback((key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Provide the context value
  return (
    <LoadingContext.Provider value={{ loadingStates, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
