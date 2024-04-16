import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur les devis
export const fetchDevis = createAsyncThunk("devis/fetchDevis", async () => {
  const response = await axios.get("http://localhost:7000/devis");
  return response.data;
});

export const fetchDevi = createAsyncThunk("devis/fetchDevi", async (id) => {
  const response = await axios.get(`http://localhost:7000/devis/${id}`);
  return response.data;
});

export const sendDevi = createAsyncThunk("devis/addDevi", async (body) => {
  const response = await axios.post("http://localhost:7000/devis", body);
  return response.data;
});

export const updateDevi = createAsyncThunk("devis/updateDevi", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/devis/${id}`, body);
  return response.data;
});

export const deleteDevi = createAsyncThunk("devis/deleteDevi", async (id) => {
  await axios.delete(`http://localhost:7000/devis/${id}`);
  return id;
});

// Création du slice pour gérer l'état des devis
const devisSlice = createSlice({
  name: "devis",
  initialState: {
    devi: null,
    devis: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDevis.fulfilled, (state, action) => {
      state.devis.items = action.payload;
      state.devis.count = action.payload.length;
    });
    builder.addCase(fetchDevi.fulfilled, (state, action) => {
      state.devi = action.payload;
    });
    builder.addCase(sendDevi.fulfilled, (state, action) => {
      state.devi = action.payload;
    });
    builder.addCase(updateDevi.fulfilled, (state, action) => {
      const updatedDevi = action.payload;
      const index = state.devis.items.findIndex(devi => devi.id === updatedDevi.id);
      if (index !== -1) {
        state.devis.items[index] = updatedDevi;
        state.devi = updatedDevi;
      }
    });
    builder.addCase(deleteDevi.fulfilled, (state, action) => {
      state.devis.items = state.devis.items.filter(devi => devi.id !== action.payload);
      state.devis.count--;
    });
  },
});

export default devisSlice.reducer;
