import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
 import Locate from "./location/Locate"
import Recent from "./recent/Recent"
import Team from "./team/Team"
import ServicedetailsCard from "../servicedetails/servicedetails"



const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <br></br>
      <h1 style={{
        color: "#25A760", 
        textAlign: "center", 
        fontSize: "2.5em",
        fontWeight: "bold",
        margin: "20px 0",
        textTransform: "uppercase",
        letterSpacing: "2px",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
      }}>
        Decouvrez Les plus moderne Maisons
      </h1>
      {/* <Recent /> */}
      {/* <Awards /> */}
     <br/> <ServicedetailsCard/>

      <Locate />
      <Team />
      
    </>
  )
}

export default Home
