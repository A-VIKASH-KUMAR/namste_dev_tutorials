import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./appSlices";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});