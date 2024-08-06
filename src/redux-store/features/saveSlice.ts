import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../types/homeTypes';

interface SavedItemsState {
  items: ProductData[];
}

const initialState: SavedItemsState = {
  items: [],
};

const savedItemsSlice = createSlice({
  name: 'savedItems',
  initialState,
  reducers: {
    addSavedItem(state, action: PayloadAction<ProductData>) {
      state.items.push(action.payload);
    },
    removeSavedItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleSavedItem(state, action: PayloadAction<ProductData>) {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addSavedItem, removeSavedItem, toggleSavedItem } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;
