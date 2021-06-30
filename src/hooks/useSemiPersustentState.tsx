import { useEffect, useState } from "react";

// Custom hook for localstorage of search results.
const useSemiPersistentState = (key: string, initialState: string): any => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue]; // hook rule: returned value must be an array
};

export default useSemiPersistentState;
