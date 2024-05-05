import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDemandesDevis = createAsyncThunk(
  "demandeDevis/fetchDemandesDevis",
  async () => {
    const response = await axios.get("http://localhost:7000/demande-devis");
    return response.data;
  }
);
export const fetchDemandeDevis = createAsyncThunk(
  "demandeDevis/fetchDemandeDevis",
  async (id) => {
    const response = await axios.get(
      `http://localhost:7000/demande-devis/${id}`
    );
    return response.data;
  }
);

export const sendDemandeDevis = createAsyncThunk(
  "demandeDevis/addDemandeDevis",
  async (body) => {
    let token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:7000/demande-devis",
      body,
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  }
);

export const updateDemandeDevis = createAsyncThunk(
  "demandeDevis/updateDemandeDevis",
  async ({ id, body }) => {
    const response = await axios.patch(
      `http://localhost:7000/demande-devis/${id}`,
      body
    );
    return response.data;
  }
);

export const deleteDemandeDevis = createAsyncThunk(
  "demandeDevis/deleteDemandeDevis",
  async (id) => {
    await axios.delete(`http://localhost:7000/demande-devis/${id}`);
    return id;
  }
);
const demandeDevisSlice = createSlice({
  name: "demandeDevis",
  initialState: {
    demandeDevis: null,
    demandesDevis: {
      items: [],
      count: 0,
    },
  },
  reducers: {
    // Reducers supplémentaires ici si nécessaire...
  },
  extraReducers(builder) {
    builder.addCase(fetchDemandesDevis.fulfilled, (state, action) => {
      state.demandesDevis.items = action.payload;
      state.demandesDevis.count = action.payload.length;
    });

    builder.addCase(fetchDemandeDevis.fulfilled, (state, action) => {
      state.demandeDevis = action.payload;
    });
    builder.addCase(sendDemandeDevis.fulfilled, (state, action) => {
      state.demandeDevis = action.payload;
    });
    builder.addCase(updateDemandeDevis.fulfilled, (state, action) => {
      const updatedDemandeDevis = action.payload;
      const index = state.demandesDevis.items.findIndex(
        (demande) => demande.id === updatedDemandeDevis.id
      );
      if (index !== -1) {
        state.demandesDevis.items[index] = updatedDemandeDevis;
        state.demandeDevis = updatedDemandeDevis;
      }
    });
    builder.addCase(deleteDemandeDevis.fulfilled, (state, action) => {
      state.demandesDevis.items = state.demandesDevis.items.filter(
        (demande) => demande.id !== action.payload
      );
      state.demandesDevis.count--;
    });
  },
});

export default demandeDevisSlice.reducer;
