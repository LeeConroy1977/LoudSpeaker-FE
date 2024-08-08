import { createContext, useState } from "react";

export const SearchBarListContext = createContext();

export const SearchBarListProvider = ({ children }) => {
  const [searchBarList, setSearchBarList] = useState([]);

  return (
    <SearchBarListContext.Provider value={{ searchBarList, setSearchBarList }}>
      {children}
    </SearchBarListContext.Provider>
  );
};
