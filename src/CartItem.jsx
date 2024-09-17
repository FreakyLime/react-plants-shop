import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import ProductPrice from './Components/ProductPrice/ProductPrice';
import ProductPriceInCart from './Components/ProductPrice/ProductPriceInCart.module.css'; 

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalCost = () => {
    return cart.reduce((total, item) => {
      const cost = item.sale ?? item.cost;
      const quantity = Number(item.quantity) || 0;
      return total + (cost * quantity);
    }, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalCost().toFixed(2)}</h2>
      <div>
        {cart.map(item => {
          const itemCost = item.sale ?? item.cost;
          const itemTotal = itemCost * (Number(item.quantity) || 0);
          
          return (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <ProductPrice cost={item.cost} sale={item.sale} className={ProductPriceInCart.productPrice} />
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${itemTotal.toFixed(2)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  onContinueShopping: PropTypes.func,
};

export default CartItem;
