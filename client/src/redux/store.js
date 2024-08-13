import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slicer.js";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
