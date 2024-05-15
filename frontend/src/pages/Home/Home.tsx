import { useState, useEffect, useRef } from "react";
import "./home.css";
import axios from "axios";
import Recipe from "../../Components/Recipe/Recipe";
import { Recipe as RecipeType } from "../../lib/types";

import punch from "../../assets/images/punch.png";
import cocktail from "../../assets/images/cocktail.png";
import cocktail2 from "../../assets/images/cocktail2.png";

import NewRecipe from "../../Components/NewRecipe/NewRecipe";
import ViewRecipe from "../../Components/ViewRecipe/ViewRecipe";

const coversArray = [cocktail, cocktail2, punch];

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const overlayRef = useRef<HTMLDivElement>(null);
  //state
  const [recipeData, setRecipeData] = useState<RecipeType[] | null>(null);
  const [newVisibility, setNewVisibility] = useState<boolean>(false);
  const [viewVisibility, setViewVisibility] = useState<boolean>(false);
  const [recipeObj, setRecipeObj] = useState<RecipeType>();

  const handleNewVisibility = () => {
    setNewVisibility(true);
  };
  const handleNewCloseClick = () => {
    setNewVisibility(false);
  };

  const handleViewVisibility = (r:RecipeType) => {
    setViewVisibility(true);
    setRecipeObj(r);
  };
  const handleViewCloseClick = () => {
    setViewVisibility(false);
    setRecipeObj(undefined);
  };

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
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setNewVisibility(false);
        setViewVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="home__container">
      <div className="home__container-header">
        <button className="primary-btn" onClick={handleNewVisibility}>
          New Recipe
        </button>
      </div>
      <div className="home__container-overlay" ref={overlayRef}>
        {newVisibility && <NewRecipe handleCloseClick={handleNewCloseClick} />}
        {viewVisibility && <ViewRecipe handleCloseClick={handleViewCloseClick} recipeData={recipeObj}/>}
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
                handleView={() => handleViewVisibility(r)}
                
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
