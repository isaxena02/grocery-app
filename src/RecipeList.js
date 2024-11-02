import React, { useState, useEffect } from 'react';

const RecipeList = ({ updateGroceryList, addFavorite }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://api.spoonacular.com/recipes/random?number=10&apiKey=31adba7c729b4b1984bc31c031cd35d7');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleCheckboxChange = (recipe, isChecked) => {
        updateGroceryList(recipe, isChecked);
    };

    return (
        <div className="recipe-list">
            <h2>Recipes</h2>
            <ul>
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <input
                                type="checkbox"
                                onChange={(e) => handleCheckboxChange(recipe, e.target.checked)}
                            />
                            {recipe.title}
                            <button onClick={() => addFavorite(recipe)}>Add to Favorites</button>
                        </li>
                    ))
                ) : (
                    <li>No recipes found.</li>
                )}
            </ul>
        </div>
    );
};

export default RecipeList;
