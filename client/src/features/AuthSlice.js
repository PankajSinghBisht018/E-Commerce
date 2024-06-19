import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAdmin: false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin ; 
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
