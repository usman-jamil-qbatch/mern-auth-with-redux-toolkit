import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice, counterSlice } from "../slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
