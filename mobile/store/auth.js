import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const me = createAsyncThunk("auth/me", async () => {
  try {
    const tokenn = await AsyncStorage.getItem("token");
    const token = JSON.parse(tokenn);
    console.log(token, "tokenfrom me");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.get(
      "http://192.168.1.106:7000/auth/me",
      config
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

export const login = createAsyncThunk("login", async (body, { dispatch }) => {
  try {
    const res = await axios.post(
      "http://192.168.1.106:7000/auth/login",
      body
    );
    await AsyncStorage.setItem("token", JSON.stringify(res.data));
    dispatch(me(res.data.authorization));
    console.log(res.data, "from login store");
    return res.data;
  } catch (e) {
    console.log(e, "error");
    throw error;
  }
});

export const logout = createAsyncThunk('logout',async()=>{
    await AsyncStorage.removeItem("token")
    
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: null,
  },
  reducers: {
   
  },
  extraReducers(builder) {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.me =null
    });
  },
});

export default authSlice.reducer;