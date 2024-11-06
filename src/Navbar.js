import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Recipe App</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/grocery-list">Grocery List</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/explore">Explore</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
