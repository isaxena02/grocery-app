import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import GroceryList from './GroceryList';

const GroceryListPage = ({ addFavorite }) => {
    const [groceryList, setGroceryList] = useState({});

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

    return (
        <div className="grocery-list-page">
            <RecipeList updateGroceryList={updateGroceryList} addFavorite={addFavorite} />
            <GroceryList groceryList={groceryList} setGroceryList={setGroceryList} />
        </div>
    );
};

export default GroceryListPage;
