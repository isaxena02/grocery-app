import React, { useState } from 'react';
import RecipeList from './RecipeList';
import GroceryList from './GroceryList';
import './styles.css';

const App = () => {
    const [groceryList, setGroceryList] = useState({});
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites')) || []
    );
    const [alert, setAlert] = useState(null);

    const updateGroceryList = (recipe, isChecked) => {
        const updatedList = { ...groceryList };

        recipe.extendedIngredients.forEach((ingredient) => {
            const { name, amount, unit } = ingredient;
            if (isChecked) {
                if (updatedList[name]) {
                    updatedList[name].amount += amount;
                } else {
                    updatedList[name] = { amount, unit };
                }
            } else {
                if (updatedList[name]) {
                    updatedList[name].amount -= amount;
                    if (updatedList[name].amount <= 0) {
                        delete updatedList[name];
                    }
                }
            }
        });

        setGroceryList(updatedList);
    };

    const addFavorite = (recipe) => {
        setFavorites((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === recipe.id);
            if (isAlreadyFavorite) {
                setAlert(`${recipe.title} is already in favorites.`);
                return prevFavorites;
            } else {
                const updatedFavorites = [...prevFavorites, recipe];
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                setAlert(`${recipe.title} added to favorites!`);
                return updatedFavorites;
            }
        });
    };

    return (
        <div className="app">
            <div className="sidebar">
                <h1>Recipe Grocery List</h1>
                <RecipeList updateGroceryList={updateGroceryList} addFavorite={addFavorite} />
            </div>
            <div className="main-content">
                <GroceryList groceryList={groceryList} setGroceryList={setGroceryList} />
                <div className="favorite-list">
                    <h2>Favorite Recipes</h2>
                    <ul>
                        {favorites.map((recipe) => (
                            <li key={recipe.id}>{recipe.title}</li>
                        ))}
                    </ul>
                </div>
                {alert && <div className="alert">{alert}</div>}
            </div>
        </div>
    );
};

export default App;
