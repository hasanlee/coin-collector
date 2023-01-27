import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", action.payload);
    },
  },
  extraReducers: {},
});

export const { toggleDarkMode } = settings.actions;
export default settings.reducer;
