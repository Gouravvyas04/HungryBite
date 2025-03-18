import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='logo' src={assets.logo}/>
                  <p>Delicious food, delivered to your doorstep! 🍕🚀<br></br>
                  Enjoy fresh, fast, and flavorful meals anytime, anywhere. We bring your favorite dishes right to you with love and care.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@hungrybite.com</li>
            </ul>
        </div>
      </div>
      <hr/>
          <p className="footer-copyright">Copyright 2025 © HungryBite.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
