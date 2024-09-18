
import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';
import Navbar from './Components/Navbar';

function App() {
  
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowProductList(true);
    setShowCart(true);
  };

  return (
    <div>
      <Navbar onGetStartedClick={handleGetStartedClick}  onHandleCartClick={handleCartClick}/>
      <div className="app-container">
        <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
            <h1>Welcome To<br/> Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
            
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Shop now
              </button>
            </div>
            <div className="aboutus_container">
            <AboutUs/>
            </div>
          </div>
        </div>
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList showCart={showCart} setShowCart={setShowCart}/>
        </div>
      </div>
    </div>
  );
}

export default App;



