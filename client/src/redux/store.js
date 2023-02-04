import { configureStore } from "@reduxjs/toolkit";
import toggle from "./stores/ToggleSlice";
import coinReducer from "./stores/CoinSlice";
import searchReducer from "./stores/SearchSlice";
import authReducer from "./stores/AuthSlice";
import dashboardReducer from "./stores/DashboardSlice";
import cartReducer from "./stores/CartSlice";
import userActionsReducer from "./stores/UserActionsSlice";

const store = configureStore({
  reducer: {
    toggle,
    coinReducer,
    searchReducer,
    authReducer,
    dashboardReducer,
    cartReducer,
    userActionsReducer,
  },
});

export default store;
