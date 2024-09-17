import { useContext } from "react";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ComposeOpenContext } from "../contexts/ComposeOpenContext";
import { SearchBarInputContext } from "../contexts/SearchBarInputContext";

export const useSearchToggle = () => {
  const { isSearchOpen, setIsSearchOpen } = useContext(SearchOpenContext);
  const { setIsComposeOpen } = useContext(ComposeOpenContext);
  const { setInput } = useContext(SearchBarInputContext);

  const toggleSearchOpen = () => {
    setIsSearchOpen((open) => !open);
    setInput("");
    setIsComposeOpen(false);
  };

  return {
    toggleSearchOpen,
  };
};

export default useSearchToggle;
