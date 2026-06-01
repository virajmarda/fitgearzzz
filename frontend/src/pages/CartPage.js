import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Cart page is working!</p>
        <Link to="/products">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CartPage;
