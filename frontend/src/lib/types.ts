export interface Ingredient {
  name: string;
  value: string;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
}

export type FlexDirection = "row" | "row-reverse";

export interface ModalProps {
  handleCloseClick: () => void;
  recipeData?: Recipe;
}

