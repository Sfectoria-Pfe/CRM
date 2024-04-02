import React from "react";
import Heading from "../../common/Heading";

import LocationCard from "./locationcard";
import VenteCard from "./locationcard"; // Importez VenteCard depuis le fichier approprié

const Location = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Les  immobilier en Tunisie Pour location!' subtitle='40 332 biens immobiliers: trouvez appartement ou la maison de vos rêves,  à louer!' />
          <LocationCard />
          <VenteCard /> {/* Utilisez le composant VenteCard ici */}
        </div>
      </section>
    </>
  );
};

export default Location;
