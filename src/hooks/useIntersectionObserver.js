import { useState } from "react";
import { useRef } from "react";

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

  const observe = (element) => {
    observer.current.observe(element);
  };

  const unobserve = (element) => {
    observer.current.unobserve(element);
  };

  return [observe, unobserve];
};

export default useIntersectionObserver;
