import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081";

const initialState = {
  intrests: [],
  isError: false,
  isSucces: false,
  isLoading: false,
};

export const getIntrests = createAsyncThunk(
  "intrest/get",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/intrest/get");
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createIntrest = createAsyncThunk(
  "intrest/add",
  async (intrest, thunkAPI) => {
    try {
      const response = await axios.patch("/intrest/add", {
        intrest,
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteIntrest = createAsyncThunk(
  "intrest/delete",
  async (intrest, thunkAPI) => {
    try {
      const response = await axios.patch("/intrest/delete", { intrest });
      if (response.data) {
        return intrest;
      }

      //
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const intrestSlice = createSlice({
  name: "intrests",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSucces = false;
      state.message = "";
    },
  },

  extraReducers: {
    [getIntrests.pending](state) {
      state.isLoading = true;
    },
    [getIntrests.fulfilled](state, action) {
      state.isLoading = false;
      state.isSucces = true;
      state.isError = false;
      state.intrests = action.payload;
    },
    [getIntrests.rejected](state, action) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.intrests = [];
    },
    [createIntrest.pending](state) {
      state.isLoading = true;
    },
    [createIntrest.fulfilled](state, action) {
      state.isLoading = false;
      state.isSucces = true;
      state.isError = false;
      state.intrests.push(action.payload);
    },
    [createIntrest.rejected](state, action) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [deleteIntrest.pending](state) {
      state.isLoading = true;
    },
    [deleteIntrest.fulfilled](state, action) {
      state.isLoading = false;
      state.isSucces = true;
      state.isError = false;
      state.intrests.splice(
        state.intrests.findIndex((arrow) => arrow.intrest === action.payload),
        1
      );
    },
    [deleteIntrest.rejected](state, action) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset } = intrestSlice.actions;

export default intrestSlice.reducer;
