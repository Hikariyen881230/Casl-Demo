import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

const reducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer: reducer,
});
