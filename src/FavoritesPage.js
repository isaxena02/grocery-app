import React from 'react';
import { useFavorites } from './FavoritesContext';
import './styles.css';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No recipes added to favorites yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((title, index) => (
            <li key={index} className="favorite-item">
              <span>{title}</span>
              <button
                onClick={() => removeFromFavorites(title)}
                className="remove-favorite-btn"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
