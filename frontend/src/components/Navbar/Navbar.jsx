import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import HungryAi from '../HungryAi/HungryAi';

const Navbar = ({ setshowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
  const [showAiPopup, setShowAiPopup] = useState(false);

  const { CartAmount, token, setToken } = useContext(StoreContext); // ✅ Fixed function name
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(""); // ✅ Corrected function name
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
      if (window.innerWidth > 750) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="navbar">
        {!isMobile ? (
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="logo" />
          </Link>
        ) : (
          <div className="logo-container">
            <span className="logo-text">
              <span className="black-text">Hungry</span>
              <span className="yellow-text">Bite</span>
            </span>
          </div>
        )}

        {!isMobile && (
          <ul className="nav-menu">
            <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
            <a href="#explore-menu" onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
            <a onClick={() => setShowAiPopup(true)} className="hungry-ai-btn">Hungry Ai</a>
            <a href="#footer" onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
          </ul>
        )}

        <div className="nav-right">
          <div className="nav-cart">
            <Link to="/cart"><img src={assets.basket_icon} alt="Basket" /></Link>
            {CartAmount() > 0 && <div className="dot"></div>}
          </div>

          {!isMobile && !token && (
            <button className="signin-btn" onClick={() => setshowLogin(true)}>Sign In</button>
          )}

          {!isMobile && token && (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="Profile Icon" />
              <ul className='nav-profile-dropdown'>
                <li>
                  <img src={assets.bag_icon} alt="Orders Icon" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout Icon" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>

        {isMobile && (
          <div className="mobile-nav">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>☰</button>
          </div>
        )}

        <div className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
          <ul className="sidebar-menu">
            <Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
            <a href="#explore-menu" onClick={() => setSidebarOpen(false)}>Menu</a>
            <a onClick={() => { setShowAiPopup(true); setSidebarOpen(false); }}>Hungry Ai</a>
            <a href="#footer" onClick={() => setSidebarOpen(false)}>Contact Us</a>
          </ul>

          <div className="sidebar-auth">
            {!token ? (
              <button className="signin-btn" onClick={() => { setshowLogin(true); setSidebarOpen(false); }}>Sign In</button>
            ) : (
              <button className="signout-btn" onClick={() => { logout(); setSidebarOpen(false); }}>Sign Out</button>
            )}
          </div>
        </div>
      </div>

      <HungryAi isOpen={showAiPopup} onClose={() => setShowAiPopup(false)} />
    </>
  );
};

export default Navbar;
