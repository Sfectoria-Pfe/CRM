import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur les détails de service
export const fetchServiceDetails = createAsyncThunk("serviceDetails/fetchServiceDetails", async () => {
  const response = await axios.get("http://localhost:7000/service-details");
  return response.data;
});

export const fetchServiceDetail = createAsyncThunk("serviceDetails/fetchServiceDetail", async (id) => {
  const response = await axios.get(`http://localhost:7000/service-details/${id}`);
  return response.data;
});

export const sendServiceDetail = createAsyncThunk("serviceDetails/addServiceDetail", async (body) => {
  const response = await axios.post("http://localhost:7000/service-details", body);
  return response.data;
});

export const updateServiceDetail = createAsyncThunk("serviceDetails/updateServiceDetail", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/service-details/${id}`, body);
  return response.data;
});

export const deleteServiceDetail = createAsyncThunk("serviceDetails/deleteServiceDetail", async (id) => {
  await axios.delete(`http://localhost:7000/service-details/${id}`);
  return id;
});

// Création du slice pour gérer l'état des détails de service
const serviceDetailsSlice = createSlice({
  name: "serviceDetails",
  initialState: {
    serviceDetail: null,
    serviceDetails: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchServiceDetails.fulfilled, (state, action) => {
      state.serviceDetails.items = action.payload;
      state.serviceDetails.count = action.payload.length;
    });
    builder.addCase(fetchServiceDetail.fulfilled, (state, action) => {
      state.serviceDetail = action.payload;
    });
    builder.addCase(sendServiceDetail.fulfilled, (state, action) => {
      state.serviceDetail = action.payload;
    });
    builder.addCase(updateServiceDetail.fulfilled, (state, action) => {
      const updatedServiceDetail = action.payload;
      const index = state.serviceDetails.items.findIndex(detail => detail.id === updatedServiceDetail.id);
      if (index !== -1) {
        state.serviceDetails.items[index] = updatedServiceDetail;
        state.serviceDetail = updatedServiceDetail;
      }
    });
    builder.addCase(deleteServiceDetail.fulfilled, (state, action) => {
      state.serviceDetails.items = state.serviceDetails.items.filter(detail => detail.id !== action.payload);
      state.serviceDetails.count--;
    });
  },
});

export default serviceDetailsSlice.reducer;
