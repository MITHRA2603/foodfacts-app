
import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [savedFoods, setSavedFoods] = useLocalStorage(
    'foodfacts-saved',
    []
  );

  const toggleSaved = (food) => {
    setSavedFoods((previous) => {
      const alreadySaved = previous.some(
        (item) => item.code === food.code
      );

      if (alreadySaved) {
        return previous.filter((item) => item.code !== food.code);
      }

      return [...previous, food];
    });
  };

  const isSaved = (code) =>
    savedFoods.some((food) => food.code === code);

  return (
    <SavedContext.Provider
      value={{ savedFoods, toggleSaved, isSaved }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedFoods() {
  return useContext(SavedContext);
}
