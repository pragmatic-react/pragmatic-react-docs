import { useEffect } from "react";

const useKeyDown = (key: KeyboardEvent["key"], onClose: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, onClose]);
};

export default useKeyDown;
