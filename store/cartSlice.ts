import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item: Product) => item._id === action.payload
      );

      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      }

      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const getCartItems = (s: RootState) => s.cart.items;
export const getCartItemById = (s: RootState, id: string) =>
  s.cart.items.find((p) => p._id === id);
export const getCartTotal = (s: RootState) =>
  s.cart.items.reduce((acc: number, item) => (acc += item.price), 0);

export default cartSlice.reducer;
