import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur les équipes commerciales
export const fetchEquipesCommerciales = createAsyncThunk("equipesCommerciales/fetchEquipesCommerciales", async () => {
  const response = await axios.get("http://localhost:7000/equipecommerciale");
  return response.data;
});

export const fetchEquipeCommerciale = createAsyncThunk("equipesCommerciales/fetchEquipeCommerciale", async (id) => {
  const response = await axios.get(`http://localhost:7000/equipecommerciale/${id}`);
  return response.data;
});

export const createEquipeCommerciale = createAsyncThunk("equipesCommerciales/createEquipeCommerciale", async (body) => {
  const response = await axios.post("http://localhost:7000/equipecommerciale", body);
  return response.data;
});

export const updateEquipeCommerciale = createAsyncThunk("equipesCommerciales/updateEquipeCommerciale", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/equipecommerciale/${id}`, body);
  return response.data;
});

export const deleteEquipeCommerciale = createAsyncThunk("equipesCommerciales/deleteEquipeCommerciale", async (id) => {
  await axios.delete(`http://localhost:7000/equipecommerciale/${id}`);
  return id;
});

const equipeCommercialeSlice = createSlice({
  name: "Equipe",
  initialState: {
    equipeCommerciale: null,
    equipesCommerciales: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchEquipesCommerciales.fulfilled, (state, action) => {
      state.equipesCommerciales.items = action.payload;
      state.equipesCommerciales.count = action.payload.length;
    });
    builder.addCase(fetchEquipeCommerciale.fulfilled, (state, action) => {
      state.equipeCommerciale = action.payload;
    });
    builder.addCase(createEquipeCommerciale.fulfilled, (state, action) => {
      state.equipeCommerciale = action.payload;
    });
    builder.addCase(updateEquipeCommerciale.fulfilled, (state, action) => {
      const updatedEquipeCommerciale = action.payload;
      const index = state.equipesCommerciales.items.findIndex(equipeCommerciale => equipeCommerciale.id === updatedEquipeCommerciale.id);
      if (index !== -1) {
        state.equipesCommerciales.items[index] = updatedEquipeCommerciale;
        state.equipeCommerciale = updatedEquipeCommerciale;
      }
    });
    builder.addCase(deleteEquipeCommerciale.fulfilled, (state, action) => {
      state.equipesCommerciales.items = state.equipesCommerciales.items.filter(equipeCommerciale => equipeCommerciale.id !== action.payload);
      state.equipesCommerciales.count--;
    });
  },
});

export default equipeCommercialeSlice.reducer;
