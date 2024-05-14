from pydantic import BaseModel
from typing import List

# class Ingredient(BaseModel):
#     name: str
#     amount: str

class Recipe(BaseModel):
    title: str
    description: str
    ingredients: List[dict]