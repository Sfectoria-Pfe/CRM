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
      <h1 >Decouvrez Les plus moderne Maisons</h1>
      {/* <Recent /> */}
      {/* <Awards /> */}
     <br/> <ServicedetailsCard/>

      <Locate />
      <Team />
      
    </>
  )
}

export default Home
