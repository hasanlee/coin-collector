import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
  alertState: true,
  alertList: [],
  modalState: false,
  sideBarOpen: true,
};

const hideAlert = (alerts, id) => {
  let filter = [...alerts].filter((alert) => alert.id !== id);
  return filter;
};

const toggle = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", action.payload);
    },
    toggleModal: (state, action) => {
      state.modalState = action.payload;
    },
    toggleAlert: (state, action) => {
      state.alertList = hideAlert(state.alertList, action.payload);
    },
    showAlert: (state, action) => {
      state.alertList = [...state.alertList, action.payload];
    },
    toggleSidebar: (state) => {
      state.sideBarOpen = !state.sideBarOpen;
    },
  },
  extraReducers: {},
});

export const {
  toggleDarkMode,
  toggleModal,
  toggleAlert,
  showAlert,
  toggleSidebar,
} = toggle.actions;
export default toggle.reducer;
