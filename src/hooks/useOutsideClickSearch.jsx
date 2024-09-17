import { useEffect } from "react";
import { useSearchToggle } from "./UseSearchOpenToggle";

function useOutsideClickSearch(ref, callback) {
  const { toggleSearchOpen } = useSearchToggle();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleSearchOpen();
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback, toggleSearchOpen]);
}

export default useOutsideClickSearch;
