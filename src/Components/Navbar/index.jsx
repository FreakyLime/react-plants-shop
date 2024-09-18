import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = ({ onGetStartedClick, onHandleCartClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const cart = useSelector(state => state.cart.items);
    const calculateTotalQuantity = () => {
        return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="./paradise-logo.png" alt="" />
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
            </div>
            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                <a href="">About</a>
                <a onClick={onGetStartedClick}>Shop</a>
                <a onClick={onHandleCartClick}>
                    <h1 className='cart'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="35" width="35">
                            <rect width="156" height="156" fill="none"></rect>
                            <circle cx="80" cy="216" r="12"></circle>
                            <circle cx="184" cy="216" r="12"></circle>
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" 
                                fill="none" 
                                stroke="#fff" 
                                strokeLinecap="round"
                                strokeLinejoin="round" 
                                strokeWidth="5" 
                                id="mainIconPathAttribute">
                            </path>
                        </svg>
                        <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                    </h1>
                </a>
            </div>
            <div className="burger" onClick={toggleMenu}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </nav>
    );
};

export default Navbar;
