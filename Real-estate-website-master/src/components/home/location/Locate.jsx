import React from "react"
import Heading from "../../common/Heading"
import { location } from "../../data/Data"
import "./Locatestyl.css"

const Locate = () => {
  return (
    <>
      <section className='location padding'>
        <div className='container'>
          <Heading title='Découvrez notre service exceptionnel et laissez-nous vous accompagner dans la réalisation de vos maisons de rêve ' subtitle='Explorez notre sélection exclusive de propriétés exceptionnelles et trouvez votre chez-vous idéal avec MaisonPlus' />

          <div className='content grid3 mtop'>
            {location.map((item, index) => (
              <div className='box' key={index}>
                <img src={item.cover} alt='' />
                <div className='overlay'>
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Villas}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Locate
