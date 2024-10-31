// src/components/Cart.js
import React from 'react';
import './Cart.css';

function Cart({ cartItems, removeFromCart }) {
    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <span>{item.name} - ${item.price}</span>
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
