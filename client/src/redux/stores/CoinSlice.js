import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
const initialState = {
  loading: false,
  serverResponse: null,
  error: null,
  modalState: false,
  coinDetail: {},
  types: [],
  compositions: [],
  countries: [],
  qualities: [],
  coins: [],
  coin: {},
};

export const getAllCoins = createAsyncThunk(
  "getAllCoins",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get("/allcoins?s=" + query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getAllCoinTypes = createAsyncThunk(
  "getAllCoinTypes",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get("/types?s=" + query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getAllCountries = createAsyncThunk(
  "getAllCountries",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get("/countries?s=" + query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getAllCompositions = createAsyncThunk(
  "getAllCompositions",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get("/compositions?s=" + query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getAllQualities = createAsyncThunk(
  "getAllQualities",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get("/qualities?s=" + query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getCoinById = createAsyncThunk(
  "getCoinById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get("/coins/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Coin methods
export const submitAddCoin = createAsyncThunk(
  "submitAddCoin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/admin/coin/", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitEditCoin = createAsyncThunk(
  "submitEditCoin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/admin/coin/" + id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitDeleteCoin = createAsyncThunk(
  "submitDeleteCoin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/admin/coin/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Composition methods
export const submitAddComposition = createAsyncThunk(
  "submitAddComposition",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/admin/composition/", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitEditComposition = createAsyncThunk(
  "submitEditComposition",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/admin/composition/" + id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitDeleteComposition = createAsyncThunk(
  "submitDeleteComposition",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/admin/composition/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Country methods
export const submitAddCountry = createAsyncThunk(
  "submitAddCountry",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/admin/country/", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitEditCountry = createAsyncThunk(
  "submitEditCountry",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/admin/country/" + id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitDeleteCountry = createAsyncThunk(
  "submitDeleteCountry",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/admin/country/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Quality methods
export const submitAddQuality = createAsyncThunk(
  "submitAddQuality",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/admin/quality/", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitEditQuality = createAsyncThunk(
  "submitEditQuality",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/admin/quality/" + id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitDeleteQuality = createAsyncThunk(
  "submitDeleteQuality",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/admin/quality/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//Type methods
export const submitAddType = createAsyncThunk(
  "submitAddType",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/admin/type/", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitEditType = createAsyncThunk(
  "submitEditType",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/admin/type/" + id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitDeleteType = createAsyncThunk(
  "submitDeleteType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/admin/type/" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
  extraReducers: (builder) => {
    //#region getCoins
    builder.addCase(getAllCoins.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(getAllCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCoins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //#endregion
    //#region getTypes
    builder.addCase(getAllCoinTypes.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(getAllCoinTypes.fulfilled, (state, action) => {
      state.types = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(getAllCoinTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getCountries
    builder.addCase(getAllCountries.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(getAllCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getQualities
    builder.addCase(getAllQualities.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(getAllQualities.fulfilled, (state, action) => {
      state.qualities = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(getAllQualities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getCompostions
    builder.addCase(getAllCompositions.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(getAllCompositions.fulfilled, (state, action) => {
      state.compositions = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(getAllCompositions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getCoinById
    builder.addCase(getCoinById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(getCoinById.fulfilled, (state, action) => {
      state.coin = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(getCoinById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region editCoin
    builder.addCase(submitEditCoin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitEditCoin.fulfilled, (state, action) => {
      state.coin = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(submitEditCoin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region deleteCoin
    builder.addCase(submitDeleteCoin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitDeleteCoin.fulfilled, (state, action) => {
      state.coin = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(submitDeleteCoin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region addCoin
    builder.addCase(submitAddCoin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitAddCoin.fulfilled, (state, action) => {
      state.coin = action.payload;
      state.loading = false;
      state.serverResponse = action.payload;
    });
    builder.addCase(submitAddCoin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region Composition
    builder.addCase(submitAddComposition.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitAddComposition.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitAddComposition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitEditComposition.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitEditComposition.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitEditComposition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitDeleteComposition.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitDeleteComposition.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitDeleteComposition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region Country
    builder.addCase(submitAddCountry.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitAddCountry.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitAddCountry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitEditCountry.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitEditCountry.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitEditCountry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitDeleteCountry.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitDeleteCountry.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitDeleteCountry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region Quality
    builder.addCase(submitAddQuality.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitAddQuality.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitAddQuality.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitEditQuality.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitEditQuality.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitEditQuality.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitDeleteQuality.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitDeleteQuality.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitDeleteQuality.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region Type
    builder.addCase(submitAddType.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitAddType.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitAddType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitEditType.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitEditType.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitEditType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(submitDeleteType.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.serverResponse = null;
    });
    builder.addCase(submitDeleteType.fulfilled, (state, action) => {
      state.serverResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(submitDeleteType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
  },
});

export const { viewCoinDetail, toggleModal } = coinReducer.actions;
export default coinReducer.reducer;
