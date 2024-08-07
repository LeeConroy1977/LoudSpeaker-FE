import { createContext, useState } from "react";

export const SearchBarInputContext = createContext();

export const SearchBarInputProvider = ({ children }) => {
  const [input, setInput] = useState("");

  return (
    <SearchBarInputContext.Provider value={{ input, setInput }}>
      {children}
    </SearchBarInputContext.Provider>
  );
};
