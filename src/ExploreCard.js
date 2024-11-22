import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const ExploreCard = ({ recipe }) => {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleFlip = () => setFlipped(!flipped);
  const handleMoreInfo = (e) => {
    e.stopPropagation();
    navigate(`/explore/${recipe.title.replace(/\s+/g, '-')}`);
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-front">
        <img src={recipe.image} alt={recipe.title} />
        <h3>{recipe.title}</h3>
      </div>
      <div className="card-back">
        <p>Cuisine: {recipe.cuisine || 'Various'}</p>
        <p>Time: {recipe.readyInMinutes} mins</p>
        <button onClick={handleMoreInfo}>More Info</button>
      </div>
    </div>
  );
};

export default ExploreCard;
