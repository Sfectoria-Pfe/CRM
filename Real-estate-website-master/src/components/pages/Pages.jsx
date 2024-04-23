import React, { createContext, useEffect } from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Pack from "../Pack/Pack.jsx";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import LoginForm from "../se connecter et inscrit/LoginForm.jsx";
import More from "../about/more.js";
import Demandedevis from "../Demandedevis/Demandedevis.js";
import Demanderendezvous from "../Demande rendez-vous/rendez-vous.js";
import Location from "../home/location/location.jsx";
import AddClient from "../se connecter et inscrit/SignupForm.jsx";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import Profile from "../profile/Profile.js";
import Chat from "../chat/ChatBox.jsx";
import { getMe } from "../store/auth.js";
import Historique from "../Historique/Historique.jsx";
import { Socket, io } from "socket.io-client";
import ViewPack from "../Pack/ViewPack.js";
import ViewService from "../services/ViewService.js";
import ChatPage from "../chat/ChatPage.jsx";

export const SocketContext = createContext();
const socket = io("http://localhost:7000"); //path of the server

const Pages = () => {
  const user = useSelector((store) => store.auth.me);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) dispatch(getMe());
  }, [dispatch]);

  // useEffect(() => {
  //   if (user) socket.emit("connection", user.id); //incide+data
  // }, [socket, user]);

  // useEffect(() => {
  //   socket.on("disconnection", (data) => {
  //     socket.emit("connection", user.id);
  //   }); //incide+callbackFn
  // }, [socket]);

  return (
    <Router>
      <SocketContext.Provider value={socket}>
        <Header user={user} />
        <Routes>
          {user ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<ChatPage />} />
            </>
          ) : (
            <>
              <Route path="/LoginForm" element={<LoginForm />} />
              <Route path="/SignupForm" element={<AddClient />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:serviceId" element={<ViewService />} />
          <Route path="/packs" element={<Pack />} />
          <Route path="/pack/:packId" element={<ViewPack />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/more" element={<More />} />
          <Route path="/Demandedevis" element={<Demandedevis />} />
          <Route path="/rendez-vous" element={<Demanderendezvous />} />
          <Route path="/location" element={<Location />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </SocketContext.Provider>
      <Footer />
    </Router>
  );
};

export default Pages;
