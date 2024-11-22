import React, { useState, useEffect } from 'react';
import fetchRecipesWithCache from './utils/api';
import { Link } from 'react-router-dom'
import './styles.css';

const Explore = () => {
  const [recipes, setRecipes] = useState([]);
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipesWithCache();
      console.log("Recipes loaded in Explore component:", data);
      setRecipes(data);
    };

    loadRecipes();
  }, []);

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

const handleMissingData = (data) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return 'N/A';
  }
  return data;
};

return (
  <div className="explore-container">
    <div className="recipe-cards-container">
      {recipes.map((recipe) => (
        <div
          className={`flip-card ${flippedCard === recipe.id ? 'flipped' : ''}`}
          key={recipe.id}
          onClick={() => handleCardClick(recipe.id)}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
            </div>

            <div className="flip-card-back">
              <p><strong>Cuisine:</strong> {handleMissingData(recipe.cuisines && recipe.cuisines.length > 0 ? recipe.cuisines.join(', ') : 'N/A')}</p>
              <p><strong>Dish Type:</strong> {handleMissingData(recipe.dishTypes && recipe.dishTypes.length > 0 ? recipe.dishTypes.join(', ') : 'N/A')}</p>
              <p><strong>Cooking Time:</strong> {handleMissingData(recipe.readyInMinutes ? `${recipe.readyInMinutes} minutes` : 'N/A')}</p>
              <p><strong>Servings:</strong> {handleMissingData(recipe.servings)}</p>
              <a href={`/recipe/${recipe.id}`} className="more-info-btn">More Info</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
      }

export default Explore;
