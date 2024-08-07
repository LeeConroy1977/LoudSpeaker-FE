import { createContext, useState } from "react";

export const FilteredArticlesContext = createContext();

export const FilteredArticlesProvider = ({ children }) => {
  const [filteredArticles, setFilteredArticles] = useState([]);

  return (
    <FilteredArticlesContext.Provider
      value={{ filteredArticles, setFilteredArticles }}
    >
      {children}
    </FilteredArticlesContext.Provider>
  );
};
