// import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../slices/authSlice";
import intrestSlice from "../slices/intrestSlice";

const persistConfig = {
  key: "root",
  storage,
};

// const rootReducer = combineReducers({
//   auth: authSlice,
//   intrests: intrestSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authSlice),
    intrests: intrestSlice,
  },
});

// const store = configureStore({
//   reducer: persistedReducer,
// });
const persistor = persistStore(store);
export { store, persistor };
