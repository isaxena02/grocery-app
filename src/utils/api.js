import axios from 'axios';

const fetchRecipesWithCache = async () => {
  const cacheKey = 'cachedRecipes';
  const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Check localStorage for cached data
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { recipes, timestamp } = JSON.parse(cachedData);
    const isCacheValid = (new Date().getTime() - timestamp) < cacheExpiration;

    // If cached data is valid, return it
    if (isCacheValid) {
      console.log("Using cached data");
      return recipes;
    }
  }

  // Make API request if no valid cache
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
        // number: 50, // Number of recipes per request
        addRecipeInformation: true, // Include detailed recipe information
        includeNutrition: true, // Include nutritional information
      },
    });

    const recipes = response.data.results;
    console.log("Fetched recipes:", recipes); 

    // Store new data in localStorage with a timestamp
    const dataToCache = {
      recipes,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
    console.log("Fetched new data from API");

    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export default fetchRecipesWithCache;
