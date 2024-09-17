import { useContext, useState } from "react";
import { SearchOpenContext } from "../contexts/SearchOpenContext";
import { ComposeOpenContext } from "../contexts/ComposeOpenContext";
import { UserContext } from "../contexts/UserContext";

const useComposeToggle = () => {
  const { setIsSearchOpen } = useContext(SearchOpenContext);
  const { isComposeOpen, setIsComposeOpen } = useContext(ComposeOpenContext);
  const { user } = useContext(UserContext);

  const toggleComposeOpen = () => {
    if (!user.username) {
      setIsSearchOpen(false);
    }
    if (user.username) {
      setIsComposeOpen((isComposeOpen) => !isComposeOpen);
      setIsSearchOpen(false);
    }
  };

  return {
    toggleComposeOpen,
  };
};

export default useComposeToggle;
