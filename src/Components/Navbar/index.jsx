import React, { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import './Navbar.css';

const Navbar = forwardRef(function Navbar({ onAboutClick, onGetStartedClick, onHandleCartClick }, ref) {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        closeMenu: () => setIsOpen(false),
    }));

    const cart = useSelector(state => state.cart.items);
    const calculateTotalQuantity = useMemo(() => {
        return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    }, [cart]);

    return (
        <nav className="navbar" role="navigation">
            <div className="navbar-brand" onClick={onAboutClick} role="button" tabIndex={0} aria-label="Home">
                <img src="./paradise-logo.png" alt="Paradise Nursery Logo" />
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
            </div>
            <div className={classNames('nav-links', { open: isOpen })} data-testid="nav-links">
                <a onClick={onAboutClick} role="button" tabIndex={0} aria-label="About">About</a>
                <a onClick={onGetStartedClick} role="button" tabIndex={0} aria-label="Shop">Shop</a>
                <a onClick={onHandleCartClick} role="button" tabIndex={0} aria-label="Cart">
                    <h1 className='cart'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="35" width="35">
                            <circle cx="80" cy="216" r="12" />
                            <circle cx="184" cy="216" r="12" />
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="5">
                            </path>
                        </svg>
                        <span className="cart_quantity_count">{calculateTotalQuantity}</span>
                    </h1>
                </a>
            </div>
            <div className="burger" onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0} aria-label="Toggle menu">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </nav>
    );
});

Navbar.propTypes = {
    onAboutClick: PropTypes.func.isRequired,
    onGetStartedClick: PropTypes.func.isRequired,
    onHandleCartClick: PropTypes.func.isRequired,
};

Navbar.displayName = 'Navbar';

export default React.memo(Navbar);
