import { createContext, useState } from "react";

export const AllArticlesCountContext = createContext();

export const AllArticlesCountProvider = ({ children }) => {
  const [AllArticlesCount, setAllArticlesCount] = useState(null);

  return (
    <AllArticlesCountContext.Provider
      value={{ AllArticlesCount, setAllArticlesCount }}
    >
      {children}
    </AllArticlesCountContext.Provider>
  );
};
