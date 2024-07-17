import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductData } from '../../types/homeTypes';

interface CartItem extends ProductData {
  quantity: number;

}


interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
  }
  
  const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem(state, action: PayloadAction<ProductData>) {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
  
        if (existingItem) {
          existingItem.quantity++;
            
          existingItem.price  += newItem.price; // Assuming price is per item
        } else {
          state.items.push({ ...newItem, quantity: 1 });
        }
        
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      },
      removeItem(state, action: PayloadAction<number>) {
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
  
        if (existingItem) {
          state.totalQuantity -= existingItem.quantity;
          state.totalPrice -= existingItem.price * existingItem.quantity;
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    }
  });
  
  export const { addItem, removeItem } = cartSlice.actions;
  export default cartSlice.reducer;
