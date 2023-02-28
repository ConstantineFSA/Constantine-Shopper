import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []

export const fetchAllProducts = createAsyncThunk(
  "products",
  async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectProducts = (state) => state.products;

export default productsReducer.reducer;
