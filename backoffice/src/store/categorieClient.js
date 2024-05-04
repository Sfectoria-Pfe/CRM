import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction asynchrone pour récupérer toutes les catégories de clients depuis l'API
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const response = await axios.get("http://localhost:7000/categorieclients");
  return response.data;
});

// Fonction asynchrone pour récupérer une catégorie de client spécifique depuis l'API en fonction de son ID
export const fetchCategory = createAsyncThunk("fetchCategory", async (id) => {
  const response = await axios.get(`http://localhost:7000/categorieclients/${id}`);
  return response.data;
});

// Fonction asynchrone pour envoyer une nouvelle catégorie de client vers l'API
export const sendCategory = createAsyncThunk("addCategory", async (body) => {
  const response = await axios.post("http://localhost:7000/categorieclients", body);
  return response.data;
});

// Fonction asynchrone pour mettre à jour une catégorie de client vers l'API
export const updateCategory = createAsyncThunk("updateCategory", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/categorieclients/${id}`, body);
  return response.data;
});

// Fonction asynchrone pour supprimer une catégorie de client de l'API
export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
  await axios.delete(`http://localhost:7000/categorieclients/${id}`);
  return id;
});

const categoriesSlice = createSlice({
  name: "CategorieClient",
  initialState: {
    category: null, 
    categories: {
      items: [], 
      count: 0, 
    },
    error: null, 
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.items = action.payload;
      state.categories.count = action.payload.length; 
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload; 
    });
    builder.addCase(sendCategory.fulfilled, (state, action) => {
      state.categories.items.push(action.payload); 
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const updatedCategory = action.payload;
      const index = state.categories.items.findIndex((category) => category.id === updatedCategory.id);
      if (index !== -1) {
        state.categories.items[index] = updatedCategory; // Met à jour la catégorie dans la liste
        state.category = updatedCategory; // Met à jour la catégorie spécifique si nécessaire
      }
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      // Supprime la catégorie de la liste en fonction de l'ID retourné par l'action
      state.categories.items = state.categories.items.filter((category) => category.id !== action.payload);
      state.categories.count--; // Réduit le nombre total de catégories
    });

    // Gestion des cas d'échec pour chaque action asynchrone
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error.message; // Stocker le message d'erreur dans l'état
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(sendCategory.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default categoriesSlice.reducer;
