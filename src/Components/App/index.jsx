import React from 'react';
import { useState, useRef, useCallback } from 'react';
import './App.css';
import ProductList from '../ProductList';
import AboutUs from '../AboutUs';
import Navbar from '../Navbar';

function App() {
  const navbarRef = useRef(null);
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleAboutClick = useCallback(() => {
    if (navbarRef.current) {
      navbarRef.current.closeMenu();
    }
    setShowProductList(false);
    setShowCart(false);
  }, []);

  const handleGetStartedClick = useCallback(() => {
    if (navbarRef.current) {
      navbarRef.current.closeMenu();
    }
    setShowProductList(true);
    setShowCart(false);
  }, []);

  const handleCartClick = useCallback(() => {
    if (navbarRef.current) {
      navbarRef.current.closeMenu();
    }
    setShowProductList(true);
    setShowCart(true);
  }, []);

  return (
    <div>
      <Navbar
        ref={navbarRef}
        onAboutClick={handleAboutClick}
        onGetStartedClick={handleGetStartedClick}
        onHandleCartClick={handleCartClick}
      />
      <div className="app-container">
        <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To<br /> Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>

              <button className="get-started-button" onClick={handleGetStartedClick}>
                Shop now
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList showCart={showCart} setShowCart={setShowCart} />
        </div>
      </div>
    </div>
  );
}

export default App;
