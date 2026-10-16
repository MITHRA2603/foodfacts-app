
import { configureStore } from '@reduxjs/toolkit';
import savedReducer from './savedSlice';

const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
});

store.subscribe(() => {
  try {
    const savedItems = store.getState().saved.items;

    localStorage.setItem(
      'foodfacts-saved',
      JSON.stringify(savedItems)
    );
  } catch (error) {
    console.error('Unable to save items to localStorage:', error);
  }
});

export default store;
