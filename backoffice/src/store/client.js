import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur le client
export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async (args) => {
    let params = {};
    if (args?.fullNameEn) {
      params["fullNameEn"] = args?.fullNameEn;
    }
    const response = await axios.get("http://localhost:7000/clients", {
      params,
    });
    return response.data;
  }
);
export const fetchClientsWithoutAccount = createAsyncThunk(
  "client/fetchClientsWithoutAccount",
  async () => {
   
    const response = await axios.get("http://localhost:7000/clients/without-account", );
    return response.data;
  }
);

export const fetchClient = createAsyncThunk(
  "client/fetchClient",
  async (id) => {
    const response = await axios.get(`http://localhost:7000/clients/${id}`);
    return response.data;
  }
);

export const sendClient = createAsyncThunk("client/addClient", async (body) => {
  const response = await axios.post("http://localhost:7000/clients", body);
  return response.data;
});

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async ({ id, body }) => {
    const response = await axios.patch(
      `http://localhost:7000/clients/${id}`,
      body
    );
    return response.data;
  }
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id) => {
    await axios.delete(`http://localhost:7000/clients/${id}`);
    return id;
  }
);

// Création du slice pour gérer l'état du client
const clientSlice = createSlice({
  name: "client",
  initialState: {
    client: null,
    clients: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.clients.items = action.payload;
      state.clients.count = action.payload.length;
    });
    builder.addCase(fetchClientsWithoutAccount.fulfilled, (state, action) => {
      state.clients.items = action.payload;
      state.clients.count = action.payload.length;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.client = action.payload;
    });
    builder.addCase(sendClient.fulfilled, (state, action) => {
      state.client = action.payload;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      const updatedClient = action.payload;
      const index = state.clients.items.findIndex(
        (client) => client.id === updatedClient.id
      );
      if (index !== -1) {
        state.clients.items[index] = updatedClient;
        state.client = updatedClient;
      }
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state.clients.items = state.clients.items.filter(
        (client) => client.id !== action.payload
      );
      state.clients.count--;
    });
  },
});

export default clientSlice.reducer;
