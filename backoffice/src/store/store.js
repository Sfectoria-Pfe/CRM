import { configureStore } from "@reduxjs/toolkit";
import products from "./products";
import order from "./order";
import service from "./services";
import auth from "./auth";
import vente from "./vente";
import opportunite from "./opportunite";
import stage from "./stage";
import stage_client from "./stage_client";
import client from "./client";
import devis from "./devis";
import promotion from "./promotion";
import user from "./user";
import employee from "./employee";
import rendezvous from "./rendezvous";
import demandedevis from "./demandedevis";
import serviceDetails from "./serviceDetails";
import Equipe from "./Equipe";
import categorieClient from "./categorieClient";
export const store = configureStore({
  reducer: {
    products,
    order,
    service,
    auth,
    vente,
    client,
    opportunite,
    stage,
    stage_client,
    devis,
    promotion,
    user,
    employee,
    rendezvous,
    demandedevis,
    serviceDetails,
    Equipe,
   categorieClient, },
});
