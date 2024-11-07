import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetail = () => {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal"
      );
      setRecipe(response.data.meals[0]);
    };

    fetchRecipe();
  }, [idMeal]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { strMeal, strMealThumb, strInstructions, strIngredients } = recipe;

  return (
    <div className="recipe-detail">
      <h1>{strMeal}</h1>
      <img src={strMealThumb} alt={strMeal} />
      <p>{strInstructions}</p>
      <h2>Ingredients:</h2>
      {strIngredients ? (
        <ul>
          {strIngredients.split(",").map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>Ingredients not available</p>
      )}
    </div>
  );
};

export default RecipeDetail;
