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
  
              <p>Quelle est la chose que les chefs d’entreprise et leurs employés, partenaires et même clients ont en commun ? Eh bien, au niveau le plus élémentaire possible, ils sont tous humains. Alors pourquoi est-il parfois si difficile pour les entreprises de mettre cela en valeur dans leurs efforts de marketing ? 
  
  De nos jours, le fait d’humaniser votre marque, représente une étape importante pour s’imposer sur le marché, ça permet d’approfondir sa relation avec les clients, de mieux communiquer avec eux et d’identifier leurs besoins. En outre, l’humanisation de votre marque fait de votre entreprise un lieu agréable à travailler.
  
  Au-delà du bureau…
  
  Ayez un onglet ‘À propos de nous’, c’est généralement le premier endroit où un client potentiel apprendra à vous connaître et à en savoir plus sur votre entreprise.
  
  Emmenez votre public dans les coulisses de votre vie d’entreprise. Les gens aiment apprendre à connaître les autres via les médias sociaux ou la presse écrite. Présentez des photos de vous dans des posts sur les réseaux sociaux et même dans des situations décontractées autre que le bureau…
  
  Injectez un sens de l’humour dans votre contenu.
  
  Il est facile pour les entreprises B2C de créer du contenu hilarant – et vous devriez certainement le faire ! Tout le monde aime rire. Bien que cette stratégie soit la meilleure pour cette catégorie d’entreprises, les marques B2B peuvent également entrer dans le jeu.
  
  Un simple post sur les réseaux sociaux utilise un langage terre-à-terre et des emojis pour rendre la marque plus accessible à son public tout en présentant une publicité qui explique comment ses services peuvent aider à améliorer votre entonnoir de vente.
  
  Mais au-delà, des millions de messages clairs et concis qui circulent quotidiennement sur la toile, vous pouvez vous distinguer en insufflant un soupçon d’humour dans votre contenu de temps en temps. Inattendu, d’une marque B2B, une action pareille, vous démarquera des entreprises concurrentes sur le marché et restera mémorable auprès des clients et followers. 
  
  Essayez de faire sourire quelqu’un. Quoi de plus humain qu’un rire débridé ?
  
  Vous souhaitez louer, acheter ou vendre ?  N’oubliez pas de découvrir toutes nos annonces sur mubawab.tn ! 
   </p>
            </div>
            <div className='right row'>
              <img 
                src='https://blog.mubawab.tn/wp-content/uploads/2022/12/blog-post-1m-fan-r__cup__r__-r__cup__r__c.png' 
                alt='' 
                style={{ height: '400px', width:'400px'}} // Définir la hauteur maximale sur 600px
              />
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default More;
  