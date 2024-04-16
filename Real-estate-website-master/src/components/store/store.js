import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import demande from "./demande";
export const store = configureStore({
  reducer: {auth,demande },
});
