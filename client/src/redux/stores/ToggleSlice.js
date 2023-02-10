import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
  alertState: true,
  alertList: [],
  modalState: false,
  sideBarOpen: true,
  cartDrawerOpen: false,
  langChanger: false,
  langList: ["AZ", "TR", "EN", "RU"],
  lang: localStorage.getItem("lang") || "US",
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
    toggleCart: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    toggleLangChanger: (state) => {
      state.langChanger = !state.langChanger;
    },
    toggleLang: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
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
  toggleCart,
  toggleLangChanger,
  toggleLang,
} = toggle.actions;
export default toggle.reducer;
