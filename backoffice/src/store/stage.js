import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur le stage
export const fetchStages = createAsyncThunk("stage/fetchStages", async () => {
  const response = await axios.get("http://localhost:7000/stages");
  return response.data;
});

export const fetchStage = createAsyncThunk("stage/fetchStage", async (id) => {
  const response = await axios.get(`http://localhost:7000/stages/${id}`);
  return response.data;
});

export const sendStage = createAsyncThunk("stage/addStage", async (body) => {
  const response = await axios.post("http://localhost:7000/stages", body);
  return response.data;
});

export const updateStage = createAsyncThunk("stage/updateStage", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/stages/${id}`, body);
  return response.data;
});

export const deleteStage = createAsyncThunk("stage/deleteStage", async (id) => {
  await axios.delete(`http://localhost:7000/stages/${id}`);
  return id;
});

// Création du slice pour gérer l'état du stage
const stageSlice = createSlice({
  name: "stage",
  initialState: {
    stage: null,
    stages: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStages.fulfilled, (state, action) => {
      state.stages.items = action.payload;
      state.stages.count = action.payload.length;
    });
    builder.addCase(fetchStage.fulfilled, (state, action) => {
      state.stage = action.payload;
    });
    builder.addCase(sendStage.fulfilled, (state, action) => {
      state.stage = action.payload;
    });
    builder.addCase(updateStage.fulfilled, (state, action) => {
      const updatedStage = action.payload;
      const index = state.stages.items.findIndex(stage => stage.id === updatedStage.id);
      if (index !== -1) {
        state.stages.items[index] = updatedStage;
        state.stage = updatedStage;
      }
    });
    builder.addCase(deleteStage.fulfilled, (state, action) => {
      state.stages.items = state.stages.items.filter(stage => stage.id !== action.payload);
      state.stages.count--;
    });
  },
});

export default stageSlice.reducer;
