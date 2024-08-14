import { createContext, useState } from "react";

export const ComposeOpenContext = createContext();

export const ComposeOpenProvider = ({ children }) => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <ComposeOpenContext.Provider value={{ isComposeOpen, setIsComposeOpen }}>
      {children}
    </ComposeOpenContext.Provider>
  );
};
