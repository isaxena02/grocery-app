import React from 'react';
import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-image">
        <img src={`${process.env.PUBLIC_URL}/background.jpg`} alt="Ingredients Background" />
      </div>
      <div className="home-text">
        <h1>Welcome to PantryPal!</h1>
        <p>Discover new recipes, create shopping lists effortlessly, and keep track of your favorite dishes.</p>
        <p>Whether you’re meal prepping or looking for new culinary inspiration, PantryPal makes grocery shopping and cooking easier than ever.</p>
      </div>
    </div>
  );
};

export default Home;
