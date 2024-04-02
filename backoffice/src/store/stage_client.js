import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStage_clients = createAsyncThunk("stage-client/fetchStages", async () => {
  const response = await axios.get("http://localhost:7000/stage-client");
  return response.data;
});

export const fetchStage_client = createAsyncThunk("stage-client/fetchStage", async (id) => {
  const response = await axios.get(`http://localhost:7000/stage-client/${id}`);
  return response.data;
});

export const sendStage_client = createAsyncThunk("stage-client/addStage", async (body) => {
  const response = await axios.post("http://localhost:7000/stage-client", body);
  return response.data;
});

export const updateStage_client = createAsyncThunk("stage-client/updateStage", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/stage-client/${id}`, body);
  return response.data;
});

export const deleteStage_client = createAsyncThunk("stage-client/deleteStage", async (id) => {
  await axios.delete(`http://localhost:7000/stage-client/${id}`);
  return id;
});

// Création du slice pour gérer l'état du stage
const stageSlice = createSlice({
  name: "stage_client",
  initialState: {
    stage_client: null,
    stage_clients: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStage_clients.fulfilled, (state, action) => {
      state.stage_clients.items = action.payload;
      state.stage_clients.count = action.payload.length;
    });
    builder.addCase(fetchStage_client.fulfilled, (state, action) => {
      state.stage_client = action.payload;
    });
    builder.addCase(sendStage_client.fulfilled, (state, action) => {
      state.stage_clients.items.push(action.payload); // Ajoute le nouveau stage
    });
    builder.addCase(updateStage_client.fulfilled, (state, action) => {
      const updatedStage = action.payload;
      const index = state.stage_clients.items.findIndex(stage => stage.id === updatedStage.id);
      if (index !== -1) {
        state.stage_clients.items[index] = updatedStage;
        state.stage_client = updatedStage;
      }
    });
    builder.addCase(deleteStage_client.fulfilled, (state, action) => {
      state.stage_clients.items = state.stage_clients.items.filter(stage => stage.id !== action.payload);
      state.stage_clients.count--;
    });
  },
});

export default stageSlice.reducer;
