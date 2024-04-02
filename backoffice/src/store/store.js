import { configureStore } from "@reduxjs/toolkit";
import products from "./products";
import order from "./order";
import service from "./services";
import auth from "./auth";
import vente from "./vente";
import client from "./client";
import opportunite from "./opportunite";
import stage from "./stage"
import stage_client from "./stage_client";
export const store = configureStore({
  reducer: { products, order, service, auth, vente, client, opportunite, stage,stage_client},
});
