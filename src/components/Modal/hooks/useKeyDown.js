import { useEffect } from "react";

const useKeyDown = (key, onClose) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === key) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, onClose]);
};

export default useKeyDown;
