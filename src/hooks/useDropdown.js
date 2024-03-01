import { useCallback, useEffect, useRef, useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  const clickOutsideEvent = useCallback((e) => {
    if (!btnRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }, []);

  const clickHandler = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      window.addEventListener("click", clickOutsideEvent);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      window.removeEventListener("click", clickOutsideEvent);
    }
  }, [isOpen]);
  return { btnRef, isOpen, clickHandler };
};

export default useDropdown;
