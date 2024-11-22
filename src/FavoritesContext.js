import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (title) => {
    if (!favorites.includes(title)) {
      setFavorites([...favorites, title]);
    }
  };

  const removeFromFavorites = (title) => {
    setFavorites(favorites.filter((item) => item !== title));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
