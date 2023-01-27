import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: false,
  coinDetail: {},
};

const coinReducer = createSlice({
  name: "coinReducer",
  initialState,
  reducers: {
    viewCoinDetail: (state, action) => {
      state.coinDetail = action.payload;
    },
    toggleModal: (state, action) => {
      state.modalState = action.payload;
    },
  },
  extraReducers: {},
});

export const { viewCoinDetail, toggleModal } = coinReducer.actions;
export default coinReducer.reducer;
