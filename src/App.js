import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const products = [
    { id: 1, name: 'Nike Air Max', img: 'https://images.unsplash.com/photo-1584862955159-f032a568e677?auto=format&fit=crop&w=500&q=80', price: 120 },
    { id: 2, name: 'Apple Watch Series 8', img: 'https://images.unsplash.com/photo-1605792657660-c3720e3b12d3?auto=format&fit=crop&w=500&q=80', price: 400 },
    { id: 3, name: 'Adidas Ultraboost', img: 'https://images.unsplash.com/photo-1598188300297-f8a92407a248?auto=format&fit=crop&w=500&q=80', price: 180 },
    { id: 4, name: 'The North Face Jacket', img: 'https://images.unsplash.com/photo-1618354694551-3e61f8b5c05a?auto=format&fit=crop&w=500&q=80', price: 220 },
    { id: 5, name: 'Sony WH-1000XM4', img: 'https://images.unsplash.com/photo-1580200054512-9e7f89c5c69f?auto=format&fit=crop&w=500&q=80', price: 350 },
    { id: 6, name: 'AirPods Pro', img: 'https://images.unsplash.com/photo-1606290696793-3c9e9f8a51c7?auto=format&fit=crop&w=500&q=80', price: 250 },
];

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
            const matches = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(matches);
        } else {
            setFilteredProducts([]);
        }
    };

    const handleSelect = (productName) => {
        setSearchQuery(productName);
        setFilteredProducts([]);
    };

    return (
        <Router>
            <div className="App">
                {/* Header */}
                <header className="navbar">
                    <div className="logo">Aman's Store</div>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {filteredProducts.length > 0 && (
                            <div className="dropdown">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="dropdown-item"
                                        onClick={() => handleSelect(product.name)}
                                    >
                                        {product.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/cart" className="cart-icon">🛒 ({cartItems.length})</Link>
                </header>

                {/* Routes */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <main className="content">
                                <div className="product-grid">
                                    {products.map((product) => (
                                        <div className="product-card" key={product.id}>
                                            <img src={product.img} alt={product.name} />
                                            <h3>{product.name}</h3>
                                            <p>${product.price}</p>
                                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                                        </div>
                                    ))}
                                </div>
                            </main>
                        }
                    />
                    <Route
                        path="/cart"
                        element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />}
                    />
                    <Route
                        path="/checkout"
                        element={<CheckoutPage cartItems={cartItems} />}
                    />
                </Routes>

                <footer className="footer">© 2024 Aman's Store. All rights reserved.</footer>
            </div>
        </Router>
    );
}

function CartPage({ cartItems, removeFromCart, clearCart }) {
    return (
        <div className="cart-page">
            <h2>Review Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cartItems.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img src={item.img} alt={item.name} />
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                                <button onClick={() => removeFromCart(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
                    <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
                </>
            )}
            <Link to="/" className="back-to-store-btn">← Back to Store</Link>
        </div>
    );
}

function CheckoutPage({ cartItems }) {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const [formData, setFormData] = useState({ name: '', address: '', email: '' });
    const [orderComplete, setOrderComplete] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderComplete(true); // Mock order completion
    };

    if (orderComplete) {
        return (
            <div className="checkout-page">
                <h2>Order Complete!</h2>
                <p>Thank you for your purchase, {formData.name}!</p>
                <Link to="/" className="back-to-store-btn">Back to Store</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <p>Total: ${total}</p>
            <form onSubmit={handleSubmit} className="checkout-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Shipping Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="complete-order-btn">Complete Order</button>
            </form>
            <Link to="/cart" className="back-to-store-btn">← Back to Cart</Link>
        </div>
    );
}

export default App;
