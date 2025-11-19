// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularDishes from './components/PopularDishes';
import KeyFeatures from './components/KeyFeatures';
import Partners from './components/Partners';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import initialMenu from './data/menu'; // Impor data menu awal

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    // State baru untuk melacak stok yang tersisa
    const [menuStock, setMenuStock] = useState(initialMenu);

    const addToCart = (item) => {
        // Cek apakah stok masih tersedia
        const menuItem = menuStock.find(menu => menu.id === item.id);
        if (menuItem && menuItem.stock > 0) {
            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

            if (existingItem) {
                setCartItems(prevItems =>
                    prevItems.map(cartItem =>
                        cartItem.name === item.name
                            ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: cartItem.totalPrice + item.price }
                            : cartItem
                    )
                );
            } else {
                setCartItems(prevItems => [...prevItems, { ...item, id: Date.now(), quantity: 1, totalPrice: item.price }]);
            }
            // Kurangi stok setelah item ditambahkan ke keranjang
            setMenuStock(prevStock =>
                prevStock.map(menu =>
                    menu.id === item.id
                        ? { ...menu, stock: menu.stock - 1 }
                        : menu
                )
            );
        } else {
            alert("Maaf, stok " + item.name + " sudah habis.");
        }
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => {
            const itemToRemove = prevItems.find(item => item.id === id);
            
            // Tambahkan kembali stok saat item dihapus dari keranjang
            setMenuStock(prevStock => 
                prevStock.map(menu => 
                    menu.name === itemToRemove.name ? { ...menu, stock: menu.stock + 1 } : menu
                )
            );

            if (itemToRemove.quantity > 1) {
                return prevItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price }
                        : item
                );
            } else {
                return prevItems.filter(item => item.id !== id);
            }
        });
    };

    const clearCart = () => {
        // Logika untuk mengembalikan stok saat keranjang dikosongkan
        cartItems.forEach(cartItem => {
            setMenuStock(prevStock => 
                prevStock.map(menu => 
                    menu.name === cartItem.name ? { ...menu, stock: menu.stock + cartItem.quantity } : menu
                )
            );
        });
        setCartItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };
    
    const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <Navbar onCartClick={toggleCart} cartItemCount={totalItemCount} />
            <Hero />
            <PopularDishes onAddToCart={addToCart} menuData={menuStock} />
            <Partners />
            <KeyFeatures />
            <Testimonial />
            <Contact />
            <Footer />

            {isCartOpen && <Cart 
                items={cartItems} 
                onClose={toggleCart} 
                onClearCart={clearCart} 
                onRemoveFromCart={removeFromCart}
            />}
        </div>
    );
};

export default App;