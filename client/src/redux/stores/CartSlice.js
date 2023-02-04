import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("coinCart")) || [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let exista = state.cart.find((coin) => coin.id === action.payload.id);
      console.log(exista);
      state.cart = [...state.cart, { ...action.payload, count: 1 }];
      localStorage.setItem("coinCart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.coinId !== action.payload);
      localStorage.setItem("coinCart", state.cart);
    },
  },
  extraReducers: {},
});

export const { addToCart, removeFromCart } = cartReducer.actions;
export default cartReducer.reducer;
