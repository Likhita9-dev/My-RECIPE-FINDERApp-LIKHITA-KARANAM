import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import { filterByTime, filterByDiet, filterByCuisine } from "./utils/filters";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ time: "", diet: "", cuisine: "" });

  const getRecipes = async (searchQuery, filterOptions = {}) => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}"
      );
      const filteredRecipes = filterRecipes(response.data.meals, filterOptions);
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    getRecipes("");
  }, []);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    getRecipes(searchTerm, filters);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    getRecipes(search, { ...filters, [filterType]: value });
  };

  const filterRecipes = (recipes, filterOptions) => {
    let filtered = recipes;
    if (filterOptions.time) {
      filtered = filterByTime(filtered, filterOptions.time);
    }
    if (filterOptions.diet) {
      filtered = filterByDiet(filtered, filterOptions.diet);
    }
    if (filterOptions.cuisine) {
      filtered = filterByCuisine(filtered, filterOptions.cuisine);
    }
    return filtered;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Recipe Finder</h1>
        <SearchBar onSearch={handleSearch} />
        <RecipeList recipes={recipes} />
      </div>
      <Routes>
        <Route path="/recipe/:idMeal" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
