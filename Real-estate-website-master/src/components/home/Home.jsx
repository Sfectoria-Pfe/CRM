import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
 import Locate from "./location/Locate"
import Recent from "./recent/Recent"
import Team from "./team/Team"



const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <br></br>
      <Recent />
      <Awards />
      <Locate />
      <Team />
      
    </>
  )
}

export default Home
