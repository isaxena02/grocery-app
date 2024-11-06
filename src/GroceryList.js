import React from 'react';

const GroceryList = ({ groceryList, setGroceryList }) => {
    const handleQuantityChange = (ingredient, newAmount) => {
        if (newAmount <= 0) {
            setGroceryList(prevList => {
                const newList = { ...prevList };
                delete newList[ingredient];
                return newList;
            });
        } else {
            setGroceryList(prevList => ({
                ...prevList,
                [ingredient]: {
                    ...prevList[ingredient],
                    amount: newAmount
                },
            }));
        }
    };

    const exportGroceryList = () => {
        const blob = new Blob([JSON.stringify(groceryList, null, 2)], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'grocery_list.txt';
        link.click();
    };

    const shareGroceryList = () => {
        const items = Object.entries(groceryList)
            .map(([ingredient, { amount, unit }]) => `${ingredient}: ${amount} ${unit}`)
            .join('\n');
        const subject = encodeURIComponent("My Grocery List");
        const body = encodeURIComponent(items);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    return (
        <div>
            <h2>Grocery List</h2>
            <ul>
                {Object.entries(groceryList).map(([ingredient, { amount, unit }]) => (
                    <li key={ingredient}>
                        {ingredient}: 
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => handleQuantityChange(ingredient, Number(e.target.value))}
                            min="0"
                        /> {unit}
                    </li>
                ))}
            </ul>
            <button onClick={exportGroceryList}>Export Grocery List</button>
            <button onClick={shareGroceryList}>Share Grocery List</button>
        </div>
    );
};

export default GroceryList;