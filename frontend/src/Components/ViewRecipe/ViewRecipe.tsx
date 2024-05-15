import React, { useState, useEffect, useRef } from "react";
import "./viewRecipe.css";
import { ModalProps } from "../../lib/types";

import close from "../../assets/icons/close.png";
import ingredientsImg from "../../assets/icons/ingredients.png";
import editImg from "../../assets/icons/edit.png";
import EditRecipe from "../EditRecipe/EditRecipe";

const ViewRecipe: React.FC<ModalProps> = ({ handleCloseClick, recipeData }) => {
  console.log("rec", recipeData);

  const overlayRef = useRef<HTMLDivElement>(null);
  const [editVisibility, setEditVisibility] = useState<boolean>(false);
  const handleEditVisibility = () => {
    setEditVisibility(true);
  };
  const handleEditCloseClick = () => {
    setEditVisibility(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setEditVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="viewRecipe__container">
      <div className="viewRecipe__container-header">
        <h1>{recipeData?.title}</h1>
        <button className="close-btn edit-btn-styles" onClick={handleEditVisibility}>
          <img src={editImg} alt="Edit Recipe" title="Edit Recipe" />
        </button>
        <button className="close-btn" onClick={handleCloseClick}>
          <img src={close} alt="Close" title="Close" />
        </button>
      </div>
      <div className="home__container-overlay" ref={overlayRef}>
        {editVisibility && (<EditRecipe handleCloseClick={handleEditCloseClick} recipeData={recipeData} />)}
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
    </div>
  );
};

export default ViewRecipe;
