import { createContext, useState } from "react";

export const FeaturedArticlesContext = createContext();

export const FeaturedArticlesProvider = ({ children }) => {
  const [featuredArticles, setFeaturedArticles] = useState([]);

  return (
    <FeaturedArticlesContext.Provider
      value={{ featuredArticles, setFeaturedArticles }}
    >
      {children}
    </FeaturedArticlesContext.Provider>
  );
};
