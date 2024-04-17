import { useEffect, useRef } from "react";

export function useOutsideClick(eventHandler, listenCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) eventHandler();
    };
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [eventHandler, listenCapturing]);

  return ref;
}
