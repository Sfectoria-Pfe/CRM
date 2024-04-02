import { configureStore } from "@reduxjs/toolkit";
import AddClient from "./SignUp";
export const store = configureStore({
  reducer: {  AddClient},
});
