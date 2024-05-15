from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Recipe
from typing import List

#App object
app = FastAPI()

from database import (
    fetch_one_recipe,
    fetch_all_recipes,
    create_recipe,
    update_recipe,
    remove_recipe,
)

origins = ['http://localhost:5173/']

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/recipes")
async def get_recipes():
    response = await fetch_all_recipes()
    return response

@app.get("/api/recipes{title}", response_model=Recipe)
async def get_recipe_by_id(title:str):
    response = await fetch_one_recipe(title)
    if response:
        return response
    raise HTTPException(status_code=404, detail="Recipe not found")
    

@app.post("/api/recipes", response_model=Recipe)
async def post_recipe(recipe: Recipe):
    response = await create_recipe(recipe.dict())
    if response:
        return response
    raise HTTPException(status_code=400, detail="Bad Request")

@app.put("/api/recipes/{title}", response_model=Recipe)
async def put_recipe(title:str, recipe:Recipe):
    response = await update_recipe(title,recipe.dict())
    if response:
        return response
    raise HTTPException(status_code=404, detail="Recipe not found")

@app.delete("/api/recipes{title}")
async def delete_recipe(title:str):
    response = await remove_recipe(title)
    if response:
        return "Successfully deleted the Recipe"
    raise HTTPException(status_code=404, detail="Recipe not found")