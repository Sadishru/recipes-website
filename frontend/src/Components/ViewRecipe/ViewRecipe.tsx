import React, { useState } from "react";
import "./viewRecipe.css";
import { ModalProps, Ingredient } from "../../lib/types";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import close from "../../assets/icons/close.png";
import ingredientsImg from "../../assets/icons/ingredients.png";
import removeImg from "../../assets/icons/remove.png";

const ViewRecipe: React.FC<ModalProps> = ({ handleCloseClick, recipeData }) => {
  console.log("rec", recipeData);
  const apiUrl = import.meta.env.VITE_API_URL;
  //states
  const [selectedName, setSelectedName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([
    { name: "", value: "" },
  ]);

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const updatedIngredients = [...ingredientsData];
    updatedIngredients[index][field] = value;
    setIngredientsData(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredientsData([...ingredientsData, { name: "", value: "" }]);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredientsData];
    updatedIngredients.splice(index, 1);
    setIngredientsData(updatedIngredients);
  };

  const submitRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const data = {
      title: selectedName,
      description: description,
      ingredients: ingredientsData,
    };
    try {
      const response = await axios.post(`${apiUrl}/api/recipes`, data, config);
      if (response.data) {
        toast("Recipe Added Successfully!🌱");
      }
    } catch (e: any) {
      toast("Oops! Try Again Later🌱");
      console.log(e.message);
    }
  };

  return (
    <div className="viewRecipe__container">
      <div className="viewRecipe__container-header">
        <h1>{recipeData?.title}</h1>
        <button className="close-btn" onClick={handleCloseClick}>
          <img src={close} alt="Close" />
        </button>
      </div>
      <div className="viewRecipe__container-description">
        <h3>{recipeData?.description}</h3>
      </div>
      <div className="viewRecipe__container-body">
        <div className="body__header">
          <img src={ingredientsImg} alt="Ingredients" />
          <h4>Ingredients</h4>
        </div>
        {recipeData &&
          recipeData.ingredients.map((item) => (
            <h3 key={item.name} className="ingredients-h3">
              {item.name} : {item.value}
            </h3>
          ))}
      </div>

      <Toaster />
    </div>
  );
};

export default ViewRecipe;
