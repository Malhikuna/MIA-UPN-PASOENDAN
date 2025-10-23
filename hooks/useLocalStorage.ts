import { useState, useEffect } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(item); 
      }
    }
  }, [isClient, key]);

  const setValue = (value: string) => {
    setStoredValue(value);
    if (isClient) {
      window.localStorage.setItem(key, value);
    }
  };

  return [storedValue, setValue, isClient] as const;
}