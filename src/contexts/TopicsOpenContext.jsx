import { createContext, useState } from "react";

export const TopicsOpenContext = createContext();

export const TopicsOpenProvider = ({ children }) => {
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  return (
    <TopicsOpenContext.Provider value={{ isTopicsOpen, setIsTopicsOpen }}>
      {children}
    </TopicsOpenContext.Provider>
  );
};
