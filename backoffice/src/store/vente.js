import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction asynchrone pour récupérer toutes les ventes depuis l'API
export const fetchVentes = createAsyncThunk("fetchVentes", async () => {
  const response = await axios.get("http://localhost:7000/ventes");
  return response.data;
});

// Fonction asynchrone pour récupérer une vente spécifique depuis l'API en fonction de son ID
export const fetchVente = createAsyncThunk("fetchVente", async (id) => {
  const response = await axios.get(`http://localhost:7000/ventes/${id}`);
  return response.data;
});

// Fonction asynchrone pour envoyer une nouvelle vente vers l'API

export const sendVente = createAsyncThunk("addVente", async (body) => {
  const response = await axios.post("http://localhost:7000/ventes", body);
  return response.data;
});
// Fonction asynchrone pour mettre à jour une vente vers l'API
export const updateVente = createAsyncThunk("updateVente", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/ventes/${id}`, body);
  return response.data;
});

// Fonction asynchrone pour supprimer une vente de l'API
export const deleteVente = createAsyncThunk("deleteVente", async (id) => {
  await axios.delete(`http://localhost:7000/ventes/${id}`);
  return id;
});

// Création du slice pour gérer l'état des ventes
const ventesSlice = createSlice({
  name: "ventes",
  initialState: {
    vente: null, // Vente spécifique
    ventes: {
      items: [], // Liste des ventes
      count: 0, // Nombre total de ventes
    },
    error: null, // Stockage des erreurs
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchVentes.fulfilled, (state, action) => {
      state.ventes.items = action.payload;
      state.ventes.count = action.payload.length; // Met à jour le nombre total de ventes
    });
    builder.addCase(fetchVente.fulfilled, (state, action) => {
      state.vente = action.payload; // Met à jour la vente spécifique
    });
    builder.addCase(sendVente.fulfilled, (state, action) => {
      state.ventes.items.push(action.payload); // Ajoute la nouvelle vente à la liste existante
    });
    builder.addCase(updateVente.fulfilled, (state, action) => {
      const updatedVente = action.payload;
      const index = state.ventes.items.findIndex((vente) => vente.id === updatedVente.id);
      if (index !== -1) {
        state.ventes.items[index] = updatedVente; // Met à jour la vente dans la liste
        state.vente = updatedVente; // Met à jour la vente spécifique si nécessaire
      }
    });
    builder.addCase(deleteVente.fulfilled, (state, action) => {
      // Supprime la vente de la liste en fonction de l'ID retourné par l'action
      state.ventes.items = state.ventes.items.filter((vente) => vente.id !== action.payload);
      state.ventes.count--; // Réduit le nombre total de ventes
    });
    
    // Gestion des cas d'échec pour chaque action asynchrone
    builder.addCase(fetchVentes.rejected, (state, action) => {
      state.error = action.error.message; // Stocker le message d'erreur dans l'état
    });
    builder.addCase(fetchVente.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(sendVente.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateVente.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteVente.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default ventesSlice.reducer;
