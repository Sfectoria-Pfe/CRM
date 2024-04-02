import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"
import { Button } from "react-bootstrap"
import {Link } from 'react-router-dom'
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
            <div className='logo'>
              <img src='data:image/png;base64,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' alt='' />
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
