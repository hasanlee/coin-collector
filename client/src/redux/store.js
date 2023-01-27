import { configureStore } from "@reduxjs/toolkit";
import setting from "./stores/SettingSlice";

const store = configureStore({
  reducer: { setting },
});

export default store;
