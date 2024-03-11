import { useRef, useCallback, useEffect } from "react";

const useIntersectionObserver = (callbackFn) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callbackFn();
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = useCallback((element) => {
    observer.current.observe(element);
  }, []);

  const unobserve = (element) => {
    observer.current.unobserve(element);
  };

  useEffect(() => {
    return () => {
      observer.current.disconnect();
    };
  }, []);

  return [observe, unobserve];
};

export default useIntersectionObserver;
