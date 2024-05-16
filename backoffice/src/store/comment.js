import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Ajoutez cette ligne pour importer createSlice
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur les commentaires
export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
  const response = await axios.get("http://localhost:7000/coments");
  return response.data;
});

export const fetchComment = createAsyncThunk("comments/fetchComment", async (id) => {
  const response = await axios.get(`http://localhost:7000/coments/${id}`);
  return response.data;
});

export const sendComment = createAsyncThunk("comments/sendComment", async (body) => {
  const response = await axios.post("http://localhost:7000/coments", body);
  return response.data;
});

export const updateComment = createAsyncThunk("comments/updateComment", async ({ id, body }) => {
  try {
    const response = await axios.patch(`http://localhost:7000/coments/${id}`, body);
    console.log("Réponse du backend après la mise à jour :", response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du commentaire sur le backend :', error);
    throw error;
  }
});

export const deleteComment = createAsyncThunk("comments/deleteComment", async (id) => {
  await axios.delete(`http://localhost:7000/coments/${id}`);
  return id;
});

const commentSlice = createSlice({
    name: "comments",
    initialState: {
      comment: null,
      comments: {
        items: [],
        count: 0,
      },
    },
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchComments.fulfilled, (state, action) => {
        state.comments.items = action.payload;
        state.comments.count = action.payload.length;
      });
      builder.addCase(fetchComment.fulfilled, (state, action) => {
        state.comment = action.payload;
      });
      builder.addCase(sendComment.fulfilled, (state, action) => {
        state.comment = action.payload;
      });
      builder.addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        const index = state.comments.items.findIndex(comment => comment.id === updatedComment.id);
        if (index !== -1) {
          state.comments.items[index] = updatedComment;
          state.comment = updatedComment;
        }
      });
      builder.addCase(deleteComment.fulfilled, (state, action) => {
        state.comments.items = state.comments.items.filter(comment => comment.id !== action.payload);
        state.comments.count--;
      });
    },
  });
  
  export default commentSlice.reducer;