import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    fetchedData: null,
    dataVisible: false,
  },
  
  reducers: {
    showData: (state) => {
      state.dataVisible = true;
    },
    hideData: (state) => {
      state.dataVisible = false;
    },
  },
});

export const { showData, hideData } = dataSlice.actions;

export default dataSlice.reducer;
