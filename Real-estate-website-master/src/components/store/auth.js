import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur le client



export const signupClient = createAsyncThunk("client/signup/client", async (body,{dispatch}) => {
  const response = await axios.post("http://localhost:7000/auth/signup/client", body);
  if (response.data.message==='user client created successfully'){
    dispatch(loginClient({email:body.email,password:body.password}))
  }
});

export const loginClient = createAsyncThunk("login",async (args,{dispatch})=>{
  const response = await axios.post("http://localhost:7000/auth/login/client",args)
  localStorage.setItem('token',response.data)
  dispatch(getMe())

})
export const getMe = createAsyncThunk("getMe",async (args)=>{
  const token =localStorage.getItem('token')
  const response = await axios.get("http://localhost:7000/auth/me",{headers:{
      Authorization:'Bearer '+token
  }})
  return response.data

})



// export const updateUserClient = createAsyncThunk("client/updateClient", async ({ id, body }) => {
//   const response = await axios.patch(`http://localhost:7000/clients/${id}`, body);
//   return response.data;
// });



// Création du slice pour gérer l'état du client
export const authSlice = createSlice({
  name: 'auth',
  initialState:{
      me:null,
  },
  reducers: {},
  extraReducers (builder){
      builder.addCase(getMe.fulfilled, (state,action)=>{
          state.me = action.payload
      })
  }
})
export default authSlice.reducer;