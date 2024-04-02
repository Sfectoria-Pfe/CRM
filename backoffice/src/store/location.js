import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction asynchrone pour récupérer toutes les locations depuis l'API
export const fetchLocations = createAsyncThunk("fetchLocations", async () => {
  const response = await axios.get("http://localhost:7000/locations");
  return response.data;
});

// Fonction asynchrone pour récupérer une location spécifique depuis l'API en fonction de son ID
export const fetchLocation = createAsyncThunk("fetchLocation", async (id) => {
  const response = await axios.get(`http://localhost:7000/locations/${id}`);
  return response.data;
});

// Fonction asynchrone pour envoyer une nouvelle location vers l'API
export const sendLocation = createAsyncThunk("addLocation", async (body) => {
  const response = await axios.post("http://localhost:7000/locations", body);
  return response.data;
});

// Fonction asynchrone pour mettre à jour une location vers l'API
export const updateLocation = createAsyncThunk("updateLocation", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/locations/${id}`, body);
  return response.data;
});

// Fonction asynchrone pour supprimer une location de l'API
export const deleteLocation = createAsyncThunk("deleteLocation", async (id) => {
  await axios.delete(`http://localhost:7000/locations/${id}`);
  return id;
});

// Création du slice pour gérer l'état des locations
const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    location: null, // Location spécifique
    locations: {
      items: [], // Liste des locations
      count: 0, // Nombre total de locations
    },
    error: null, // Stockage des erreurs
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.locations.items = action.payload;
      state.locations.count = action.payload.length; // Met à jour le nombre total de locations
    });
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.location = action.payload; // Met à jour la location spécifique
    });
    builder.addCase(sendLocation.fulfilled, (state, action) => {
      state.locations.items.push(action.payload); // Ajoute la nouvelle location à la liste existante
    });
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      const updatedLocation = action.payload;
      const index = state.locations.items.findIndex((location) => location.id === updatedLocation.id);
      if (index !== -1) {
        state.locations.items[index] = updatedLocation; // Met à jour la location dans la liste
        state.location = updatedLocation; // Met à jour la location spécifique si nécessaire
      }
    });
    builder.addCase(deleteLocation.fulfilled, (state, action) => {
      // Supprime la location de la liste en fonction de l'ID retourné par l'action
      state.locations.items = state.locations.items.filter((location) => location.id !== action.payload);
      state.locations.count--; // Réduit le nombre total de locations
    });

    // Gestion des cas d'échec pour chaque action asynchrone
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.error = action.error.message; // Stocker le message d'erreur dans l'état
    });
    builder.addCase(fetchLocation.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(sendLocation.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateLocation.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteLocation.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default locationsSlice.reducer;
