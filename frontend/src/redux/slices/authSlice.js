import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthToken } from "../../config/axios-config";

axios.defaults.baseURL = "http://localhost:8081";

const initialState = {
  user: null,
  isError: false,
  isSucces: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/user/register", user);
      setAuthToken(response.data);
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

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("/user/login", user);
    setAuthToken(response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  setAuthToken();
});

export const authSlice = createSlice({
  name: "auth",
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
    [register.pending](state) {
      state.isLoading = true;
    },
    [register.fulfilled](state, action) {
      state.isLoading = false;
      state.isSucces = true;
      state.isError = false;
      state.user = action.payload;
    },
    [register.rejected](state, action) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },

    [login.pending](state) {
      state.isLoading = true;
    },
    [login.fulfilled](state, action) {
      state.isLoading = false;
      state.isSucces = true;
      state.isError = false;
      state.user = action.payload;
    },
    [login.rejected](state, action) {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
    [logout.pending](state) {
      state.isLoading = true;
    },
    [logout.fulfilled](state) {
      state.user = null;
    },
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
