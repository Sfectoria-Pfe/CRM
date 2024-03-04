import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../apps/App";
import Auth from "../apps/Auth";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import NotFound from "../pages/NotFound";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AddProduct from "../pages/product/views/AddProduct";
import ProductList from "../pages/product/views/ProductList";
import ProductDetails from "../pages/product/views/ProductDetails";
import Profile from "../pages/profile/Profile";
import ProfileDetails from "../pages/profile/views/ProfileDetails";
import EditProfile from "../pages/profile/views/EditProfile";
export const UserContext = createContext();

export default function Router() {
  const [user, setUser] = useState({
    id: "1",
    cin:"134345545345",
    userName: "Roua",
    userPrenom: "Arji",
    userentreprise:"pfe",
    Adresse: "GAFSA",
    email: "arjiroua12@.com", // La clé devrait être "email" au lieu de "emmail"
    Age: "21",
    tel:"99999999",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0gzLY4wZlPsuyS8lEOH38PpxQZ0fGkhqVoFSLGmUbF8JjR_c3IhVqwsd4VxNKF4zxv8&usqp=CAU"
});
  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            {user ? (
              <Route path="/" element={<App />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Product />}>
                  <Route index element={<ProductList />} />
                  <Route path=":id" element={<ProductDetails />} />
                  <Route path="add" element={<AddProduct />} />
                </Route>
                <Route path="profile" element={<Profile />}>
                  <Route index element={<ProfileDetails />} />
                  <Route path="edit" element={<EditProfile />} />
                </Route>
              </Route>
            ) : (
              <Route path="/" element={<Auth />}></Route>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}