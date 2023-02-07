import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("coinCart")) || [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { coinId } = action.payload;
      const exist = state.cart.find((coin) => coin.coinId === coinId);
      if (exist) {
        state.cart = state.cart.map((c) => {
          if (c.coinId === coinId) {
            return {
              ...c,
              quantity: c.quantity + 1,
            };
          }
          return c;
        });
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
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
