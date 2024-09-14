import { createContext, useState } from "react";

export const AllArticlesCountContext = createContext();

export const AllArticlesCountProvider = ({ children }) => {
  const [allArticlesCount, setAllArticlesCount] = useState(null);
  console.log(allArticlesCount, "context");

  return (
    <AllArticlesCountContext.Provider
      value={{ allArticlesCount, setAllArticlesCount }}
    >
      {children}
    </AllArticlesCountContext.Provider>
  );
};
