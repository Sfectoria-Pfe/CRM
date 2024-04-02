import React from "react"
import Heading from "../../common/Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading title=' trouvez appartement ou la maison de vos rêves  à vendre ou à louer' subtitle='40 122 biens immobiliers' />
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
