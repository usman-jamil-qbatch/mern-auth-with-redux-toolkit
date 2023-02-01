import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  intrests: [],
  isError: false,
  isSucces: false,
  isLoading: false,
};

export const getIntrests = createAsyncThunk(
  "intrest/get",
  async (intrest, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8081/intrest/get", {
        headers: {
          Authorization: `Bearer ${intrest}`,
        },
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

export const createIntrest = createAsyncThunk(
  "intrest/add",
  async (intrests, thunkAPI) => {
    try {
      const response = await axios.patch(
        "http://localhost:8081/intrest/add",
        { intrests: intrests.details },
        {
          headers: {
            Authorization: `Bearer ${intrests.token}`,
          },
        }
      );

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
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        "http://localhost:8081/intrest/delete",
        { intrest: data.intrest },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      return response.data;

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

  extraReducers: (builder) => {
    builder
      .addCase(getIntrests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIntrests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.intrests = action.payload;
      })
      .addCase(getIntrests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.intrests = [];
      })
      .addCase(createIntrest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIntrest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.intrests = action.payload;
      })
      .addCase(createIntrest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.intrests = null;
      })
      .addCase(deleteIntrest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIntrest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.intrests = action.payload;
      })
      .addCase(deleteIntrest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.intrests = null;
      });
  },
});

export const { reset } = intrestSlice.actions;

export default intrestSlice.reducer;
