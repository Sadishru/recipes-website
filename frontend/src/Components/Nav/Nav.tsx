import React,{ useState } from "react";
import "./nav.css";
import searchIcon from "../../assets/icons/search.png";

const Nav = () => {
    const [selectedRecipe, setSelectedRecipe] = useState<string>("");
   
  return (
    <div className="nav__container">
      <h3>Recipes Corner</h3>
      <div className="nav__container-cta">
        <form>
            <input type="text" value={selectedRecipe} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSelectedRecipe(e.target.value)} placeholder="Search Recipe by Name" />
            <button type="button">
                <img src={searchIcon} alt="Search" />
            </button>
        </form>
      </div>
    </div>
  )
}

export default Nav
