
import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('foodfacts-saved');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: loadFromStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.code !== action.payload
      );
    },
  },
});

export const { addItem, removeItem } = savedSlice.actions;
export default savedSlice.reducer;
