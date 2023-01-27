import { configureStore } from "@reduxjs/toolkit";
import setting from "./stores/SettingSlice";
import coinReducer from "./stores/CoinSlice";
import searchReducer from "./stores/SearchSlice";

const store = configureStore({
  reducer: { setting, coinReducer, searchReducer },
});

export default store;
