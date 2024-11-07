import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}"
        );
        setRecipe(response.data.meals[0]);
      } catch (error) {
        setError("Error fetching recipe data");
      }
    };

    fetchRecipe();
  }, [idMeal]);

  if (error) {
    return <div>{error}</div>;
  }

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
          {strIngredients.split(", ").map((ingredientWithQuantity, index) => {
            const [quantity, ingredientName] =
              ingredientWithQuantity.split(" ");
            return (
              <li key={index}>
                {quantity} {ingredientName}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Ingredients not available for this recipe.</p>
      )}
    </div>
  );
};

export default RecipeDetails;
