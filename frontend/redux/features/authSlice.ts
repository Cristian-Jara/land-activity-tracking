import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, logout, finishLoading } = authSlice.actions;
export default authSlice.reducer;
