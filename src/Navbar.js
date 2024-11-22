import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>PantryPal</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/grocery-list">Grocery List</Link>
      </div>
    </nav>
  );
}

export default Navbar;