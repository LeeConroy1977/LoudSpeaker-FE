import { useEffect } from "react";
import { useSearchToggle } from "./UseSearchOpenToggle";

function useOutsideClickCompose(ref, callback) {
  // const { isComposeOpen, setIsComposeOpen } = useContext(ComposeOpenContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // If it is outside, toggle the search open state and call the callback
        // This will handle the state toggle
        callback(); // Call the provided callback function
      }
    }

    // Add event listener for mousedown and touchstart
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback]);

  // No dependencies need to be added here other than those used in the effect
}

export default useOutsideClickCompose;
