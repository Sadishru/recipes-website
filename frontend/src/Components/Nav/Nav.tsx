import React, { useState, useEffect, useRef } from "react";
import "./nav.css";
import axios from "axios";
import { Recipe as RecipeType } from "../../lib/types";
import toast, { Toaster } from "react-hot-toast";

import searchIcon from "../../assets/icons/search.png";
import ViewRecipe from "../ViewRecipe/ViewRecipe";
import ViewFiltered from "../ViewFiltered/ViewFiltered";

const Nav = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const overlayRef = useRef<HTMLDivElement>(null);

  const [selectedRecipe, setSelectedRecipe] = useState<string>("");
  const [recipeData, setRecipeData] = useState<RecipeType[] | null>(null);
  const [viewVisibility, setViewVisibility] = useState<boolean>(false);
  const [recipeObj, setRecipeObj] = useState<RecipeType>();

  const handleViewVisibility = (r: RecipeType) => {
    setViewVisibility(true);
    setRecipeObj(r);
  };
  const handleViewCloseClick = () => {
    setViewVisibility(false);
    setRecipeObj(undefined);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
    getRecipeById(); // Calls your function to handle form submission
  };


  const getRecipeById = async () => {
    try {
      const formattedRecipe = capitalizeFirstLetter(selectedRecipe);
      const response = await axios.get(
        `${apiUrl}/api/recipes${formattedRecipe}`
      );
      if (response.data) {
        setRecipeData(response.data);
        handleViewVisibility(response.data);
        console.log("recipes", response.data);
      }
    } catch (error) {
      console.log("recipes err", error);
      toast("Oops! Recipe Not Found 🥃");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setViewVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="nav__container">
      <h3>Recipes Corner</h3>
      <div className="nav__container-cta">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={selectedRecipe}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedRecipe(e.target.value)
            }
            placeholder="Search Recipe by Name"
          />
          <button type="submit">
            <img src={searchIcon} alt="Search" />
          </button>
        </form>
      </div>
      <div className="home__container-overlay" ref={overlayRef}>
        {viewVisibility && (
          <ViewFiltered
            handleCloseClick={handleViewCloseClick}
            recipeData={recipeObj}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Nav;
