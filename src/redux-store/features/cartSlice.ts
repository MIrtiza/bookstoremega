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

      const newItemPrice = newItem.price ?? 0;

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += newItemPrice;
    },
    removeItem(state, action: PayloadAction<number>) {
        const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        const existingItemPrice = existingItem.price ?? 0;
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItemPrice * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    updateItemQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
        const { id, quantity } = action.payload;
        const existingItem = state.items.find(item => item.id === id);
  
        if (existingItem) {
            const existingItemPrice = existingItem.price ?? 0;
            const difference = quantity - existingItem.quantity;
          
            existingItem.quantity = quantity;
            state.totalQuantity += difference;
            state.totalPrice += difference * existingItemPrice;
          }
      },
      

  }
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;



export default cartSlice.reducer;
