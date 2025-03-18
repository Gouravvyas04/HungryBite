import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Placeorder from './pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

// 🎨 Professional & Unique Preloader Component
const Preloader = () => {
  return (
    <div style={styles.preloaderContainer}>
      <div style={styles.plateContainer}>
        {/* Fixed Elegant Plate with Fork & Spoon */}
        <div style={styles.plate}>
          <span style={styles.fork}>🍴</span>
          <span style={styles.spoon}>🥄</span>
        </div>
        {/* Rotating Gradient Loader Around the Plate */}
        <div style={styles.loader}></div>
      </div>
      <p style={styles.loadingText}>Bringing Deliciousness to Your Doorstep</p>
    </div>
  );
};

const App = () => {
  const [showLogin, setshowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {showLogin && <LoginPopup setshowLogin={setshowLogin} />}
          <div className='app'>
            <Navbar setshowLogin={setshowLogin} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/order' element={<Placeorder />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

// 🎨 Premium Internal CSS - Elegant & Attractive Styling
const styles = {
  preloaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  plateContainer: {
    position: 'relative',
    width: '140px',
    height: '140px',
  },
  plate: {
    width: '100px',
    height: '100px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Richer shadow for depth
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2',
    border: '3px solid #ff6f00', // Rich orange rim
  },
  fork: {
    fontSize: '24px',
    marginRight: '10px',
    color: '#333', // Darker color for a refined look
  },
  spoon: {
    fontSize: '24px',
    marginLeft: '10px',
    color: '#333',
  },
  loader: {
    width: '140px',
    height: '140px',
    border: '4px solid transparent',
    borderTop: '4px solid #ff6f00',
    borderRight: '4px solid #ff9800',
    borderRadius: '50%',
    position: 'absolute',
    top: '0',
    left: '0',
    animation: 'rotate 1s ease-in-out infinite',
  },
  loadingText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff6f00',
    marginTop: '20px',
    fontFamily: `'Poppins', sans-serif`,
    letterSpacing: '0.5px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // Soft shadow for richness
  },
};

// 🌀 Smooth & Professional Rotation Animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default App;
