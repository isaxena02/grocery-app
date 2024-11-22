import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Explore from './Explore';
import FavoritesPage from './FavoritesPage';
import GroceryListPage from './GroceryListPage';
import RecipeDetail from './RecipeDetailsPage'
import { FavoritesProvider } from './FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/grocery-list" element={<GroceryListPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
    </FavoritesProvider>
  );
}

export default App;