import React from 'react';

const FavoritesPage = ({ favorites }) => {
    const hasFavorites = favorites && favorites.length > 0;

    return (
        <div className="favorite-list">
            <h2>Favorite Recipes</h2>
            {hasFavorites ? (
                <ul>
                    {favorites.map((recipe) => (
                        <li key={recipe.id}>{recipe.title}</li>
                    ))}
                </ul>
            ) : (
                <div className="placeholder-content">
                    <p>You haven’t added any recipes to favorites yet!</p>
                    <p>Here are some examples of recipes that could be in your favorites:</p>
                    <ul>
                        <li>Spaghetti Carbonara</li>
                        <li>Grilled Chicken Salad</li>
                        <li>Vegetarian Tacos</li>
                        <li>Avocado Toast</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;