import { useContext, useState } from "react";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ComposeOpenContext } from "../contexts/ComposeOpenContext";

const useSearchToggle = () => {
  const { isSearchOpen, setIsSearchOpen } = useContext(SearchOpenContext);
  const { isComposeOpen, setIsComposeOpen } = useContext(ComposeOpenContext);

  const toggleSearchOpen = () => {
    setIsSearchOpen((open) => !open);
    setIsComposeOpen(false);
  };

  return {
    toggleSearchOpen,
  };
};

export default useSearchToggle;
