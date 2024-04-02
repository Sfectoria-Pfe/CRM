import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction asynchrone pour récupérer tous les services depuis l'API
export const fetchServices = createAsyncThunk("fetchServices", async () => {
  const response = await axios.get("http://localhost:7000/services");
  return response.data;
});

// Fonction asynchrone pour récupérer un service spécifique depuis l'API en fonction de son ID
export const fetchService = createAsyncThunk("fetchService", async (id) => {
  const response = await axios.get(`http://localhost:7000/services/${id}`);
  return response.data;
});

// Fonction asynchrone pour envoyer un nouveau service vers l'API
export const sendService = createAsyncThunk("addService", async (body) => {
  const response = await axios.post("http://localhost:7000/services", body);
  return response.data;
});
export const updateService = createAsyncThunk("updateService", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/services/${id}`, body);
  return response.data;
});

// Fonction asynchrone pour supprimer un service de l'API
export const deleteService = createAsyncThunk("deleteService", async (id) => {
  await axios.delete(`http://localhost:7000/services/${id}`);
  return id;
});


// Création du slice pour gérer l'état des services
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    service: null, // Service spécifique
    services: {
      items: [], // Liste des services
      count: 0, // Nombre total de services
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services.items = action.payload;
      state.services.count = action.payload.length; // Met à jour le nombre total de services
    });
    builder.addCase(fetchService.fulfilled, (state, action) => {
      state.service = action.payload; // Met à jour le service spécifique
    });
    builder.addCase(sendService.fulfilled, (state, action) => {
      state.service=action.payload; // Ajoute le nouveau service à la liste existante
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
           const updatedService = action.payload;
      const index = state.services.items.findIndex(service => service.id === updatedService.id);
      if (index !== -1) {
        state.services.items[index] = updatedService; // Met à jour le service dans la liste
        state.service = updatedService; // Met à jour le service spécifique si nécessaire
      }
    });
    
    
    builder.addCase(deleteService.fulfilled, (state, action) => {
      // Supprimez le service de la liste en fonction de l'ID retourné par l'action
      state.services.items = state.services.items.filter(service => service.id !== action.payload);
      state.services.count--; // Réduisez le nombre total de services
    });
  },
});

export default servicesSlice.reducer;
