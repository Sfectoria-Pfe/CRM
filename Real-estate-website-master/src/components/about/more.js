import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"
const More = () => {
    return (
      <>
        <section className='about'>
          <Back name='About Us' title='A propos de nous' cover={img} />
          <div className='container flex mtop'>
            <div className='left row'>
              <Heading title='Notre agence Mubaweb' />
  
              <p>Bienvenue chez Maison Plus, votre partenaire de confiance pour tous vos besoins immobiliers. Forts de notre expertise et de notre engagement envers l'excellence, nous nous efforçons de fournir des services immobiliers exceptionnels à nos clients.

À Maison Plus, nous comprenons que l'achat, la vente ou la location d'une propriété est l'une des décisions les plus importantes de la vie. C'est pourquoi nous nous engageons à accompagner nos clients à chaque étape du processus, en leur offrant des conseils personnalisés et des solutions sur mesure.

Notre équipe dévouée est composée de professionnels chevronnés de l'immobilier, dotés d'une connaissance approfondie du marché local et d'une passion pour offrir un service client de première classe. Que vous recherchiez votre maison de rêve, que vous souhaitiez vendre votre propriété existante ou que vous envisagiez de louer un bien, nos agents immobiliers compétents sont là pour vous guider et vous soutenir.

En plus de notre expertise en vente et en location, Maison Plus offre une gamme complète de services pour répondre à tous vos besoins immobiliers. De la conception et de la décoration d'intérieur à la gestion de projet et aux services de réparation, notre équipe expérimentée est là pour transformer votre espace et le rendre véritablement spécial.

Ce qui distingue Maison Plus, c'est notre engagement envers l'excellence, notre intégrité et notre engagement envers la satisfaction totale du client. Nous sommes fiers de construire des relations solides et durables avec nos clients, fondées sur la confiance et le professionnalisme.

Contactez-nous dès aujourd'hui pour découvrir comment Maison Plus peut vous aider à concrétiser vos rêves immobiliers. Nous sommes impatients de vous servir et de vous accompagner dans votre parcours immobilier.

Bienvenue chez Maison Plus - où vos rêves immobiliers deviennent réalité. </p>
            </div>
            {/* <div className='right row'>
              <img 
                src='https://blog.mubawab.tn/wp-content/uploads/2022/12/blog-post-1m-fan-r__cup__r__-r__cup__r__c.png' 
                alt='' 
                style={{ height: '400px', width:'400px'}} // Définir la hauteur maximale sur 600px
              /> */}
            {/* </div> */}
          </div>
        </section>
      </>
    )
  }
  
  export default More;
  