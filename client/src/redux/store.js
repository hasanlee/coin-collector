import { configureStore } from "@reduxjs/toolkit";
import toggle from "./stores/ToggleSlice";
import coinReducer from "./stores/CoinSlice";
import searchReducer from "./stores/SearchSlice";
import authReducer from "./stores/AuthSlice";

const store = configureStore({
  reducer: { toggle, coinReducer, searchReducer, authReducer },
});

export default store;
