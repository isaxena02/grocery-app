import React, { useState } from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import FavoritesPage from './FavoritesPage';
import GroceryListPage from './GroceryListPage';
import ExplorePage from './ExplorePage';
import './styles.css';

const App = () => {
    const [groceryList, setGroceryList] = useState({});
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites')) || []
    );

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
                alert(`${recipe.title} is already in favorites.`);
                return prevFavorites;
            } else {
                const updatedFavorites = [...prevFavorites, recipe];
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                alert(`${recipe.title} added to favorites!`);
                return updatedFavorites;
            }
        });
    };

    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/grocery-list" element={<GroceryListPage addFavorite={addFavorite} />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
