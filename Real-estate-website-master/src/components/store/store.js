import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import demande from "./demande";
import RendezVous from "./Rendez-vous";
export const store = configureStore({
  reducer: {auth,demande,RendezVous },
});
