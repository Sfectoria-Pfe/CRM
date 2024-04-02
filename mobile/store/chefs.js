import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const config="/192.168.1.106"
// Fonction asynchrone pour récupérer toutes les ventes depuis l'API
export const fetchChefs = createAsyncThunk("fetchChef", async () => {
  const response = await axios.get(`http://${config}:7000/chef`);
  
  return response.data;
});

// Fonction asynchrone pour récupérer une vente spécifique depuis l'API en fonction de son ID
export const fetchchef = createAsyncThunk("fetchchef", async (id) => {
  const response = await axios.get(`http://localhost:7000/chef/${id}`);
  return response.data;
});

// Fonction asynchrone pour envoyer une nouvelle vente vers l'API
export const sendChef = createAsyncThunk("sendChef", async (body) => {
  const response = await axios.post("http://localhost:7000/chef", body);
  return response.data;
});

// Fonction asynchrone pour mettre à jour une vente vers l'API
export const updateChef = createAsyncThunk("updateChef", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/chef/${id}`, body);
  return response.data;
});

// Fonction asynchrone pour supprimer une vente de l'API
export const deleteChef = createAsyncThunk("deleteChef", async (id) => {
  await axios.delete(`http://localhost:7000/chef/${id}`);
  return id;
});

// Création du slice pour gérer l'état des ventes
const chefsSlice = createSlice({
  name: "chefs",
  initialState: {
    chef: null, // Vente spécifique
    chefs: {
      items: [], // Liste des ventes
      count: 0, // Nombre total de ventes
    },
    error: null, // Stockage des erreurs
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchChefs.fulfilled, (state, action) => {
      state.chefs.items = action.payload;
      state.chefs.count = action.payload.length; // Met à jour le nombre total de ventes
    });
    builder.addCase(fetchchef.fulfilled, (state, action) => {
      state.chef = action.payload; // Met à jour la vente spécifique
    });
    builder.addCase(sendChef.fulfilled, (state, action) => {
      state.chefs.items.push(action.payload); // Ajoute la nouvelle vente à la liste existante
    });
    builder.addCase(updateChef.fulfilled, (state, action) => {
      const updatedChef = action.payload;
      const index = state.chefs.items.findIndex((chef) => chef.id === updatedChef.id);
      if (index !== -1) {
        state.chefs.items[index] = updatedChef; // Met à jour la vente dans la liste
        if (state.chef && state.chef.id === updatedChef.id) {
          state.chef = updatedChef; // Met à jour la vente spécifique si nécessaire
        }
      }
    });
    builder.addCase(deleteChef.fulfilled, (state, action) => {
      // Supprime la vente de la liste en fonction de l'ID retourné par l'action
      state.chefs.items = state.chefs.items.filter((chef) => chef.id !== action.payload);
      state.chefs.count--; // Réduit le nombre total de ventes
    });

    // Gestion des cas d'échec pour chaque action asynchrone
    builder.addCase(fetchChefs.rejected, (state, action) => {
      state.error = action.error.message; // Stocker le message d'erreur dans l'état
    });
    builder.addCase(fetchchef.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(sendChef.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateChef.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteChef.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default chefsSlice.reducer;