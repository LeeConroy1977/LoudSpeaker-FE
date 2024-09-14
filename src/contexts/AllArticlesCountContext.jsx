import { createContext, useState } from "react";

export const AllArticlesCountContext = createContext();

export const AllArticlesCountProvider = ({ children }) => {
  const [allArticlesCount, setAllArticlesCount] = useState(null);

  return (
    <AllArticlesCountContext.Provider
      value={{ allArticlesCount, setAllArticlesCount }}
    >
      {children}
    </AllArticlesCountContext.Provider>
  );
};
