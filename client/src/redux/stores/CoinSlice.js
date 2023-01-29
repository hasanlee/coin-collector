import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  error: {},
  modalState: false,
  coinDetail: {},
  types: [],
  compositions: [],
  countries: [],
  qualities: [],
  coins: [],
  coin: {},
};

export const getAllCoins = createAsyncThunk("getAllCoins", async (query) => {
  const response = await axios.get(
    process.env.REACT_APP_API_URL + "/allcoins?query=" + query
  );
  return response.data;
});
export const getAllCoinTypes = createAsyncThunk(
  "getAllCoinTypes",
  async (query) => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/types?query=" + query
    );
    return response.data;
  }
);
export const getAllCountries = createAsyncThunk("getAllCountries", async () => {
  const response = await axios.get(
    process.env.REACT_APP_API_URL + "/countries"
  );
  return response.data;
});
export const getAllCompositions = createAsyncThunk(
  "getAllCompositions",
  async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/compositions"
    );
    return response.data;
  }
);
export const getAllQualities = createAsyncThunk("getAllQualities", async () => {
  const response = await axios.get(
    process.env.REACT_APP_API_URL + "/qualities"
  );
  return response.data;
});
export const getCoinById = createAsyncThunk("getCoinById", async (id) => {
  const response = await axios.get(
    process.env.REACT_APP_API_URL + "/coins/" + id
  );
  return response.data;
});
export const submitEditCoin = createAsyncThunk(
  "submitEditCoin",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id, data);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/admin/coin/" + id,
        data
      );
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
      state.error = "";
    });
    builder.addCase(getAllCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
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
      state.error = "";
    });
    builder.addCase(getAllCoinTypes.fulfilled, (state, action) => {
      state.types = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCoinTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getCountries
    builder.addCase(getAllCountries.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getQualities
    builder.addCase(getAllQualities.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllQualities.fulfilled, (state, action) => {
      state.qualities = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllQualities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getCompostions
    builder.addCase(getAllCompositions.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllCompositions.fulfilled, (state, action) => {
      state.compositions = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCompositions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getCoinById
    builder.addCase(getCoinById.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCoinById.fulfilled, (state, action) => {
      state.coin = action.payload;
      state.loading = false;
    });
    builder.addCase(getCoinById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
    //#region getCoinById
    builder.addCase(submitEditCoin.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(submitEditCoin.fulfilled, (state, action) => {
      state.coin = action.payload;
      state.loading = false;
    });
    builder.addCase(submitEditCoin.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.payload;
    });
    //#endregion
  },
});

export const { viewCoinDetail, toggleModal } = coinReducer.actions;
export default coinReducer.reducer;
