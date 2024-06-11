import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/CartSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme:themeReducer,

  },
});
