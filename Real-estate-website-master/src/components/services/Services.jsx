import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../images/services.jpg";
import Back from "../common/Back";
import FeaturedCard from "../home/featured/FeaturedCard";
import LocationCard from "../home/location/locationcard";
import Recent from "../home/recent/Recent";
// import HeaderHome from "../common/HeaderHome";
// import AboutUs from "../common/AboutUs";

const Services = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Services' title='Notre Service ' cover={img} />
        <div className='featured container'>
          <FeaturedCard />

          <br/><br/>
          <h1 className="section-title" style={{ backgroundColor: "#00695c", color: "#ffffff", padding: "10px", borderRadius: "5px" }}>Notre immobilier pour la location</h1>
          <br></br> <br></br>
          <LocationCard />
<br/><br/>
<h1 className="section-title" style={{ backgroundColor: "#00695c", color: "#ffffff", padding: "10px", borderRadius: "5px" }}>Notre immobilier pour la vente</h1>
<Recent />
        </div>
      </section>
    </>
  );
}

export default Services;
