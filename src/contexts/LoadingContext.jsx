import React, { createContext, useState, useContext, useCallback } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({
    article: false,
    mainArticle: false,
    featuredArticles: false,
  });

  const setLoading = useCallback((key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <LoadingContext.Provider value={{ loadingStates, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
