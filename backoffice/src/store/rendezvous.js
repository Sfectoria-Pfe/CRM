import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRendezvous = createAsyncThunk("rendezvous/fetchRendezvous", async () => {
  const response = await axios.get("http://localhost:7000/rendezvous");
  return response.data;
});

export const addRendezvous = createAsyncThunk("rendezvous/addRendezvous", async (body) => {
  const response = await axios.post("http://localhost:7000/rendezvous", body);
  return response.data;
});

export const updateRendezvous = createAsyncThunk("rendezvous/updateRendezvous", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/rendezvous/${id}`, body);
  return response.data;
});

export const deleteRendezvous = createAsyncThunk("rendezvous/deleteRendezvous", async (id) => {
  await axios.delete(`http://localhost:7000/rendezvous/${id}`);
  return id;
});
export const updateRendezStatus = createAsyncThunk(
  "rendezvous/updateRendezStatus",
  async ({ id, newStatus }) => {
    const response = await axios.patch(`http://localhost:7000/rendezvous/${id}`, {
      statut: newStatus,
    });
    return response.data;
  }
);

const rendezvousSlice = createSlice({
  name: "rendezvous",
  initialState: {
    rendezvous: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRendezvous.fulfilled, (state, action) => {
      state.rendezvous.items = action.payload;
      state.rendezvous.count = action.payload.length;
    });
    builder.addCase(addRendezvous.fulfilled, (state, action) => {
      state.rendezvous.items.push(action.payload);
    });
    builder.addCase(updateRendezvous.fulfilled, (state, action) => {
      const updatedRendezvous = action.payload;
      const index = state.rendezvous.items.findIndex(rendezvous => rendezvous.id === updatedRendezvous.id);
      if (index !== -1) {
        state.rendezvous.items[index] = updatedRendezvous;
      }
    });
    builder.addCase(deleteRendezvous.fulfilled, (state, action) => {
      state.rendezvous.items = state.rendezvous.items.filter(rendezvous => rendezvous.id !== action.payload);
      state.rendezvous.count--;
    });
  },
});

export default rendezvousSlice.reducer;
