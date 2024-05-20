import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:7000/users", {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id) => {
    const response = await axios.get(`http://localhost:7000/users/${id}`);
    return response.data;
  }
);

export const sendUser = createAsyncThunk("user/sendUser", async (body) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("http://localhost:7000/users", body,{
    headers: { Authorization: "Bearer " + token },
  });  return response.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, body }) => {
    try {
      const response = await axios.patch(
        `http://localhost:7000/users/${id}`,
        body
      );
      console.log("Réponse du backend après la mise à jour :", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de user sur le backend :",
        error
      );
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`http://localhost:7000/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.users.items = action.payload;
      state.users.count = action.payload.length;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(sendUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.items.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (index !== -1) {
        state.users.items[index] = updatedUser;
        state.user = updatedUser;
      }
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users.items = state.users.items.filter(
        (user) => user.id !== action.payload
      );
      state.users.count--;
    });
  },
});

export default userSlice.reducer;
