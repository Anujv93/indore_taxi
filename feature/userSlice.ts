// features/userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user;

export default userSlice.reducer;
