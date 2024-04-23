import React, { useEffect } from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../Pack/Pack.jsx";
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
import Chat from "../chat/Chat.jsx";
import { getMe } from "../store/auth.js";
import Historique from "../Historique/Historique.jsx";

const Pages = () => {
  const user = useSelector((store) => store.auth.me);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) dispatch(getMe());
  }, [dispatch]);
  console.log(user);
  return (
    <Router>
      <Header user={user} />
      <Routes>
        {user ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/more" element={<More />} />
        <Route path="/Demandedevis" element={<Demandedevis />} />
        <Route path="/rendez-vous" element={<Demanderendezvous />} />
        <Route path="/location" element={<Location />} />
        <Route path="/historique" element={<Historique/>} />
        <Route path="/Chat"    element={<Chat />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default Pages;
