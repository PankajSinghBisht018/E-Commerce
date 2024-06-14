import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/CartSlice';
import themeReducer from '../features/ThemeSlice';
import authReducer from '../features/AuthSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme:themeReducer,
    auth: authReducer,

  },
});
