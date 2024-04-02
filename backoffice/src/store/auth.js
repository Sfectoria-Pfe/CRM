import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const login = createAsyncThunk("login",async (args,{dispatch})=>{
    const response = await axios.post("http://localhost:7000/auth/login",args)
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