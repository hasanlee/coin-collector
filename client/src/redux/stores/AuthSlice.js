import axios from "../../utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

const initialState = {
  loading: false,
  error: null,
  authToken: decodeToken(Cookies.get("access_token")),
  success: false,
};

export const signIn = createAsyncThunk(
  "signIn",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", data);
      Cookies.set("access_token", response.data.accessToken);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const signUp = createAsyncThunk(
  "signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    removeTokenAndCookie: (state) => {
      state.authToken = null;
      Cookies.remove("access_token", { path: "/" });
    },
  },
  extraReducers: (builder) => {
    //#region signIn
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authToken = decodeToken(Cookies.get("access_token"));
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //#endregion
    //#region signUp
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = "";
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      // state.authToken = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    //#endregion
  },
});

export const { removeTokenAndCookie } = authReducer.actions;
export default authReducer.reducer;
