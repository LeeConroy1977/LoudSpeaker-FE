import { useEffect } from "react";
import { useSearchToggle } from "../hooks/UseSearchOpenToggle";

function useOutsideClick(ref, callback) {
  const { toggleSearchOpen } = useSearchToggle();

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click was outside of the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        // If it is outside, toggle the search open state and call the callback
        toggleSearchOpen(); // This will handle the state toggle
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
  }, [ref, callback, toggleSearchOpen]);

  // No dependencies need to be added here other than those used in the effect
}

export default useOutsideClick;
