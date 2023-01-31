import axios from "../../utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const dashboardReducer = createSlice({
  name: "dashboardReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = dashboardReducer.actions;
export default dashboardReducer.reducer;
