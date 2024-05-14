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
            <Heading title='Notre agence MaisonPlus' />

            <p>Chez Maison Plus, nous sommes votre partenaire immobilier de confiance, offrant des services exceptionnels de vente, location et conseils personnalisés. Notre équipe d'experts passionnés vous accompagne à chaque étape, avec une connaissance approfondie du marché local et un engagement envers votre satisfaction. En plus de nos services immobiliers, nous proposons des solutions de design, décoration et réparation, grâce à une équipe compétente et dévouée. Fiers de notre excellence, intégrité et service client de première classe, nous sommes là pour réaliser vos rêves immobiliers. Bienvenue chez Maison Plus, où votre bien-être est notre priorité.
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
