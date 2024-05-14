import { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import Recipe from "../../Components/Recipe/Recipe";
import { Recipe as RecipeType } from "../../lib/types";

import punch from "../../assets/images/punch.png";
import cocktail from "../../assets/images/cocktail.png";
import cocktail2 from "../../assets/images/cocktail2.png";

const coversArray = [cocktail, cocktail2, punch];

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [recipeData, setRecipeData] = useState<RecipeType[] | null>(null);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/recipes`);
      if (response.data) {
        setRecipeData(response.data);
        console.log("recipes", response.data);
      }
    } catch (error) {
      console.log("recipes err", error);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <div className="home__container">
      <div className="home__container-header">
        <button className="primary-btn">New Recipe</button>
      </div>
      <div className="home__container-recipes">
        {recipeData &&
          recipeData.map((r, i) => (
            <div className="recipes__section" key={i}>
              <Recipe
                recipeCover={coversArray[i]}
                recipeName={r?.title}
                recipeDescription={r?.description}
                flexDirection={i % 2 === 0 ? "row" : "row-reverse"}
              />
            </div>
          ))}
      </div>
      <div className="home__container-footer">
        <p>Hello Marius :) would love some feedback © 2024</p>
      </div>
    </div>
  );
};

export default Home;
