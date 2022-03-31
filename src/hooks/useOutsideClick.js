import { useEffect } from "react";

/**
 * @param {import('react').MutableRefObject<any>} ref
 * @param {() => void} fn
 */
function useOutsideClick(ref, fn) {
  useEffect(() => {
    /**
     * @param {MouseEvent} event
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, fn]);
}

export default useOutsideClick;
