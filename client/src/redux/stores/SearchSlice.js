import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "?s=",
};

const searchReducer = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSearchQuery } = searchReducer.actions;
export default searchReducer.reducer;
