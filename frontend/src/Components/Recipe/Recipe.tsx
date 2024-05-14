import { type FlexDirection } from "../../lib/types";
import "./recipe.css";

type recipeProps = {
    recipeCover ?: string;
    recipeName : string;
    recipeDescription: string;
    flexDirection: FlexDirection;
}

const Recipe = ({recipeCover,recipeName,recipeDescription, flexDirection}:recipeProps) => {
  return (
    <div className='recipe__container' style={{"flexDirection":flexDirection}}>
      <div className="recipe__container-cover">
        <img src={recipeCover} alt='cover' />
      </div>
      <div className="recipe__container-info">
        <h1>{recipeName}</h1>
        <p>{recipeDescription}</p>
        <button className='primary-btn'>
          View Recipe
        </button>
      </div>
    </div>
  )
}

export default Recipe
