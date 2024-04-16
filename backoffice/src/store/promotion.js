import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur les opportunités
export const fetchPromotion = createAsyncThunk("promotion/fetchPromotion", async () => {
  const response = await axios.get("http://localhost:7000/promotion");
  return response.data;
});

export const fetchpromotion = createAsyncThunk("promotion/fetchpromotion", async (id) => {
  const response = await axios.get(`http://localhost:7000/promotion/${id}`);
  return response.data;
});

export const sendPromotion = createAsyncThunk("promotion/sendPromotion", async (body) => {
  const response = await axios.post("http://localhost:7000/promotion", body);
  return response.data;
});

export const updatePromotion = createAsyncThunk("promotion/updatePromotion", async ({ id, body }) => {
  try {
    // Envoi de la requête PATCH à l'endpoint d'opportunité sur votre backend avec les données de mise à jour
    const response = await axios.patch(`http://localhost:7000/promotion/${id}`, body);
    console.log("Réponse du backend après la mise à jour :", response.data); // Ajout du console.log pour vérifier la réponse du backend
    
    return response.data; // Supposons que votre backend renvoie l'opportunité mise à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour de promotion sur le backend :', error);
    throw error;
  }
});

export const deletePromotion = createAsyncThunk("promotion/deletePromotion", async (id) => {
  await axios.delete(`http://localhost:7000/promotion/${id}`);
  return id;
});

// Création du slice pour gérer l'état des opportunités
const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotion: null,
    promotions: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPromotion.fulfilled, (state, action) => {
      state.promotions.items = action.payload;
      state.promotions.count = action.payload.length;
    });
    builder.addCase(fetchpromotion.fulfilled, (state, action) => {
      state.promotion = action.payload;
    });
    builder.addCase(sendPromotion.fulfilled, (state, action) => {
      state.promotion = action.payload;
    });
    builder.addCase(updatePromotion.fulfilled, (state, action) => {
      const updatePromotion = action.payload;
      const index = state.promotion.items.findIndex(promotion=> promotion.id === updatePromotion.id);
      if (index !== -1) {
        state.promotions.items[index] = updatePromotion;
        state.promotion = updatePromotion;
      }
    });
    builder.addCase(deletePromotion.fulfilled, (state, action) => {
      state.promotions.items = state.promotions.items.filter(promotion => promotion.id !== action.payload);
      state.promotions.count--;
    });
  },
});

export default promotionSlice.reducer;