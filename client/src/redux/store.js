import { configureStore } from "@reduxjs/toolkit";
import toggle from "./stores/ToggleSlice";
import coinReducer from "./stores/CoinSlice";
import searchReducer from "./stores/SearchSlice";

const store = configureStore({
  reducer: { toggle, coinReducer, searchReducer },
});

export default store;
