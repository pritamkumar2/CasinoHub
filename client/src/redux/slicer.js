import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catagoryData: [],
};

export const counterSlice = createSlice({
  name: "dbBet",
  initialState,
  reducers: {
    setCatagoryData: (state, action) => {
      state.catagoryData = action.payload;
    },
  },
});

export const { setCatagoryData } = counterSlice.actions;

export default counterSlice.reducer;
