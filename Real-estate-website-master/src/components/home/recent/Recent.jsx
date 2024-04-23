import React from "react";
import Heading from "../../common/Heading";
import "./recent.css";
import RecentCard from "./RecentCard";
import VenteCard from "./RecentCard"; // Importez VenteCard depuis le fichier approprié

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Tout immobilier en Tunisie en vente ' subtitle='40 000 biens immobiliers: trouvez appartement ou la maison de vos rêves, à vendre ' />
          {/* <RecentCard /> */}
          <VenteCard /> Utilisez le composant VenteCard ici
        </div>
      </section>
    </>
  );
};

export default Recent;
