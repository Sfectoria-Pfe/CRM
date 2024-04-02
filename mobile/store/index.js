import { configureStore } from "@reduxjs/toolkit";
import chefsSlice from "./chefs"
import  authSlice  from "./auth";
export const store = configureStore({
  reducer: {chefsSlice, authSlice},
  
});
