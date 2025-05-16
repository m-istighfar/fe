"use client";

import { debounceInterface } from "@/types/interface";
import { useState, useEffect } from "react";

export const useDebounce = ({ value, delay }: debounceInterface) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
