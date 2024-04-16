import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"
import { Button } from "react-bootstrap"
import {Link } from 'react-router-dom'
import image from "../../images/Logo maisonplus.png"
const Footer = () => {
  return (
    <>
      <section >
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              
            </div>
            {/* <button className='btn5'>Contact Us Today</button> */}
          </div>
        </div>
      </section>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo' style={{width:"150px",height:"120px"}}>
              <img src={image} />
              <h2>inscrivez, Maintenant</h2>
              {/* <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p> */}

              <div className='input flex'>
                {/* <input type='text' placeholder='Email Address' /> */}
                <Button as={Link} to="/signupForm" style={{backgroundColor:"#25A760"}}>Inscrire</Button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
     
    </>
  )
}

export default Footer
