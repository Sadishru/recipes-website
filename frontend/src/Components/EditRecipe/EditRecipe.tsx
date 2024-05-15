import React, { useState, useEffect } from "react";
import "./editRecipe.css";
import { ModalProps, Ingredient } from "../../lib/types";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import close from "../../assets/icons/close.png";
import ingredientsImg from "../../assets/icons/ingredients.png";
import removeImg from "../../assets/icons/remove.png";

const EditRecipe: React.FC<ModalProps> = ({ handleCloseClick, recipeData }) => {
    console.log("edit", recipeData)
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
        const encodedTitle = encodeURIComponent(recipeData?.title||'');
      const response = await axios.put(`${apiUrl}/api/recipes/${encodedTitle}`, data, config);
      if (response.data) {
        toast("Recipe Updated Successfully! 🥃");
      }
    } catch (e: any) {
      toast("Oops! Try Again Later 🥃");
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (recipeData) {
      setSelectedName(recipeData.title);
      setDescription(recipeData.description);
      setIngredientsData(recipeData.ingredients);
    }
  }, [recipeData]);

  return (
    <div className="editRecipe__container">
      <form onSubmit={submitRecipe}>
        <div className="editRecipe__container-header">
          <input
            type="text"
            placeholder="Recipe Name"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="input-field"
            required
          />
          <button className="close-btn" onClick={handleCloseClick}>
            <img src={close} alt="Close" />
          </button>
        </div>
        <div className="editRecipe__container-description">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="editRecipe__container-body">
          <div className="body__header">
            <img src={ingredientsImg} alt="Ingredients" />
            <h4>Ingredients</h4>
          </div>
          {ingredientsData.map((ingredient, index) => (
            <div key={index} className="ingredient__item">
              <input
                type="text"
                placeholder="Ingredient"
                required
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="input-field-secondary"
              />
              <input
                type="text"
                placeholder="Value"
                required
                value={ingredient.value}
                onChange={(e) =>
                  handleIngredientChange(index, "value", e.target.value)
                }
                className="input-field-secondary"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-btn"
              >
                <img src={removeImg} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-btn">
            Add Ingredient
          </button>
        </div>
        <div className="editRecipe__container-cta">
          <button type="submit" className="add-btn">
            Save
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default EditRecipe;
