import { createContext, useState } from "react";

export const SearchOpenContext = createContext();

export const SearchOpenProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <SearchOpenContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
      {children}
    </SearchOpenContext.Provider>
  );
};
