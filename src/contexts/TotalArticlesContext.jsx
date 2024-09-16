import { createContext, useState } from "react";

export const TotalArticlesContext = createContext();

export const TotalArticlesProvider = ({ children }) => {
  const [totalArticles, setTotalArticles] = useState(null);

  return (
    <TotalArticlesContext.Provider value={{ totalArticles, setTotalArticles }}>
      {children}
    </TotalArticlesContext.Provider>
  );
};
