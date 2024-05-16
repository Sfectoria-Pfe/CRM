import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPromotion = createAsyncThunk(
  "promotion/fetchPromotion",
  async (category) => {
    const response = await axios.get("http://localhost:7000/promotion", {
      params: {
        category: category,
      },
    });
    return response.data;
  }
);

const promotionSlice = createSlice({
    name: "promotion",
    initialState: {
      promotions: { // Correction ici
        items: [],
        count: 0,
      },
    },
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchPromotion.fulfilled, (state, action) => {
        state.promotions.items = action.payload;
        state.promotions.count = action.payload.length;
      });
    },
  });

export default promotionSlice.reducer;
