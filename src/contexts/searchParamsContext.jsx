import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchParamsContext = createContext();

export const SearchParamsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchParamsContext.Provider>
  );
};
