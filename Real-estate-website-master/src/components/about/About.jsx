import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='A propos de nous' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Notre agence Mubaweb' />

            <p>Quelle est la chose que les chefs d’entreprise et leurs employés, partenaires et même clients ont en commun ? Eh bien, au niveau le plus élémentaire possible, ils sont tous humains. Alors pourquoi est-il parfois si difficile pour les entreprises de mettre cela en valeur dans leurs efforts de marketing ? 

De nos jours, le fait d’humaniser votre marque, représente une étape importante pour s’imposer sur le marché, ça permet d’approfondir sa relation avec les clients, de mieux communiquer avec eux et d’identifier leurs besoins. En outre, l’humanisation de votre marque fait de votre entreprise un lieu agréable à travailler.

Au-delà du bureau…
 </p>
 <Link to="/more">
        <button className='btn2'>More About Us</button>
      </Link>          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
