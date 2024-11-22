import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
          },
        });
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe-details-container">
      <div className="recipe-top-section">
        <div className="recipe-left">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="recipe-source-link"
          >
            View Full Recipe
          </a>
        </div>
        <div className="recipe-right">
          <h1>{recipe.title}</h1>
          <p><strong>Cooking Time:</strong> {recipe.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Cuisine:</strong> {recipe.cuisines.join(', ') || 'N/A'}</p>
          <p><strong>Dish Type:</strong> {recipe.dishTypes.join(', ') || 'N/A'}</p>
          <p><strong>Diets:</strong> {recipe.diets.join(', ') || 'N/A'}</p>
        </div>
      </div>
      <div className="recipe-bottom-section">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.original} ({ingredient.amount} {ingredient.unit})
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          {recipe.analyzedInstructions.length > 0 ? (
            <ol>
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
