"use client";

import { useState } from "react";
import { getStoredItem, setStoredItem } from "@/lib/storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStoredItem<T>(key, initialValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setStoredItem(key, valueToStore);
    } catch {
      // ignore quota errors
    }
  };

  return [storedValue, setValue] as const;
}
