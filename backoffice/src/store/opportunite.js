import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur les opportunités
export const fetchOpportunites = createAsyncThunk("opportunite/fetchOpportunites", async (id) => {
  const response = await axios.get(`http://localhost:7000/opportunites/opportunity-commercial/${id}`);
  return response.data;
});

export const fetchOpportunite = createAsyncThunk("opportunite/fetchOpportunite", async (id) => {
  const response = await axios.get(`http://localhost:7000/opportunites/${id}`);
  return response.data;
});
export const fetchOpportuniteAdmin = createAsyncThunk("opportunite/fetchOpportuniteAdmin", async () => {
  const response = await axios.get(`http://localhost:7000/opportunites/getAllOpt`);
  return response.data;
});

export const sendOpportunite = createAsyncThunk("opportunite/addOpportunite", async (body) => {
  const response = await axios.post("http://localhost:7000/opportunites", body);
  return response.data;
});

export const updateOpportunite = createAsyncThunk("opportunite/updateOpportunite", async ({ id, body }) => {
  try {
    // Envoi de la requête PATCH à l'endpoint d'opportunité sur votre backend avec les données de mise à jour
    const response = await axios.patch(`http://localhost:7000/opportunites/${id}`, body);
    console.log("Réponse du backend après la mise à jour :", response.data); // Ajout du console.log pour vérifier la réponse du backend
    
    return response.data; // Supposons que votre backend renvoie l'opportunité mise à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'opportunité sur le backend :', error);
    throw error;
  }
});

export const deleteOpportunite = createAsyncThunk("opportunite/deleteOpportunite", async (id) => {
  await axios.delete(`http://localhost:7000/opportunites/${id}`);
  return id;
});

// Création du slice pour gérer l'état des opportunités
const opportuniteSlice = createSlice({
  name: "opportunite",
  initialState: {
    opportunite: null,
    opportunites: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOpportunites.fulfilled, (state, action) => {
      state.opportunites.items = action.payload;
      state.opportunites.count = action.payload.length;
    });
    builder.addCase(fetchOpportuniteAdmin.fulfilled, (state, action) => {
      state.opportunites.items = action.payload;
      state.opportunites.count = action.payload.length;
    });
    builder.addCase(fetchOpportunite.fulfilled, (state, action) => {
      state.opportunite = action.payload;
    });
    builder.addCase(sendOpportunite.fulfilled, (state, action) => {
      state.opportunite = action.payload;
    });
    builder.addCase(updateOpportunite.fulfilled, (state, action) => {
      const updatedOpportunite = action.payload;
      const index = state.opportunites.items.findIndex(opportunite => opportunite.id === updatedOpportunite.id);
      if (index !== -1) {
        state.opportunites.items[index] = updatedOpportunite;
        state.opportunite = updatedOpportunite;
      }
    });
    builder.addCase(deleteOpportunite.fulfilled, (state, action) => {
      state.opportunites.items = state.opportunites.items.filter(opportunite => opportunite.id !== action.payload);
      state.opportunites.count--;
    });
  },
});

export default opportuniteSlice.reducer;
