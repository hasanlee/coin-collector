import axios from "../../utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  response: null,
  liked: 0,
  favorited: 0,
};

export const coinLike = createAsyncThunk(
  "coinLike",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post("/like/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const coinFavorite = createAsyncThunk(
  "coinFavorite",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post("/favorite/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkFavorited = createAsyncThunk(
  "checkFavorited",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get("/favorited/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkLiked = createAsyncThunk(
  "checkLiked",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get("/liked/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const coinView = createAsyncThunk(
  "coinView",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post("/coin/view/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userActionsReducer = createSlice({
  name: "userActionsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region like coin
    builder.addCase(coinLike.pending, (state, action) => {
      state.loading = true;
      state.response = null;
      state.error = null;
    });
    builder.addCase(coinLike.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(coinLike.rejected, (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    });
    //#endregion
    //#region favorite coin
    builder.addCase(coinFavorite.pending, (state, action) => {
      state.loading = true;
      state.response = null;
      state.error = null;
    });
    builder.addCase(coinFavorite.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(coinFavorite.rejected, (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    });
    //#endregion
    //#region view coin
    builder.addCase(coinView.pending, (state, action) => {
      state.loading = true;
      state.response = null;
      state.error = null;
    });
    builder.addCase(coinView.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(coinView.rejected, (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    });
    //#endregion
    //#region liked/favorited coin
    builder.addCase(checkFavorited.pending, (state, action) => {
      state.loading = true;
      state.response = null;
      state.error = null;
      state.favorited = 0;
    });
    builder.addCase(checkFavorited.fulfilled, (state, action) => {
      state.favorited = action.payload.favorited;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(checkFavorited.rejected, (state, action) => {
      state.loading = false;
      state.response = null;
      state.favorited = 0;
      state.error = action.payload;
    });
    builder.addCase(checkLiked.pending, (state, action) => {
      state.loading = true;
      state.response = null;
      state.error = null;
      state.liked = 0;
    });
    builder.addCase(checkLiked.fulfilled, (state, action) => {
      state.liked = action.payload.liked;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(checkLiked.rejected, (state, action) => {
      state.loading = false;
      state.response = null;
      state.liked = 0;
      state.error = action.payload;
    });
    //#endregion
  },
});

export const {} = userActionsReducer.actions;
export default userActionsReducer.reducer;
