import axios from "../../utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  totalLikes: 0,
  totalFavorites: 0,
  totalCoinViews: 0,
  totalCoins: 0,
  categoryViewsStatistics: [],
};

export const getTotalLikes = createAsyncThunk(
  "getTotalLikes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/total/likes");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getTotalFavorites = createAsyncThunk(
  "getTotalFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/total/favorites");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getTotalViews = createAsyncThunk(
  "getTotalViews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/total/views");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getCategoryStatistics = createAsyncThunk(
  "getCategoryStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/statistics/categoryviews");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTotalCoins = createAsyncThunk(
  "getTotalCoins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/total/coins");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const dashboardReducer = createSlice({
  name: "dashboardReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region getTotalLikes
    builder.addCase(getTotalLikes.pending, (state, action) => {
      state.loading = true;
      state.totalLikes = 0;
      state.error = null;
    });
    builder.addCase(getTotalLikes.fulfilled, (state, action) => {
      state.totalLikes = action.payload.count;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getTotalLikes.rejected, (state, action) => {
      state.loading = false;
      state.totalLikes = 0;
      state.error = action.payload;
    });
    //#endregion
    //#region getTotalFavorites
    builder.addCase(getTotalFavorites.pending, (state, action) => {
      state.loading = true;
      state.totalFavorites = 0;
      state.error = null;
    });
    builder.addCase(getTotalFavorites.fulfilled, (state, action) => {
      state.totalFavorites = action.payload.count;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getTotalFavorites.rejected, (state, action) => {
      state.loading = false;
      state.totalFavorites = 0;
      state.error = action.payload;
    });
    //#endregion
    //#region getTotalViews
    builder.addCase(getTotalViews.pending, (state, action) => {
      state.loading = true;
      state.totalCoinViews = 0;
      state.error = null;
    });
    builder.addCase(getTotalViews.fulfilled, (state, action) => {
      state.totalCoinViews = action.payload.count;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getTotalViews.rejected, (state, action) => {
      state.loading = false;
      state.totalCoinViews = 0;
      state.error = action.payload;
    });
    //#endregion
    //#region getTotalCoins
    builder.addCase(getTotalCoins.pending, (state, action) => {
      state.loading = true;
      state.totalCoins = 0;
      state.error = null;
    });
    builder.addCase(getTotalCoins.fulfilled, (state, action) => {
      state.totalCoins = action.payload.count;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getTotalCoins.rejected, (state, action) => {
      state.loading = false;
      state.totalCoins = 0;
      state.error = action.payload;
    });
    //#endregion
    //#region getCategoryStatistics
    builder.addCase(getCategoryStatistics.pending, (state, action) => {
      state.loading = true;
      state.categoryViewsStatistics = [];
      state.error = null;
    });
    builder.addCase(getCategoryStatistics.fulfilled, (state, action) => {
      state.categoryViewsStatistics = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCategoryStatistics.rejected, (state, action) => {
      state.loading = false;
      state.categoryViewsStatistics = [];
      state.error = action.payload;
    });
    //#endregion
  },
});

export const {} = dashboardReducer.actions;
export default dashboardReducer.reducer;
