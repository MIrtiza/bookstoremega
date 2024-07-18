// hooks/useDebounce.ts
import { useRef, useEffect } from 'react';

const useDebounce = (callback: Function, delay: number) => {
  const handler = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (handler.current !== undefined) {
        clearTimeout(handler.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: any) => {
    if (handler.current !== undefined) {
      clearTimeout(handler.current);
    }
    handler.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
