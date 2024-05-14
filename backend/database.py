from model import Recipe
#mongoDB driver
import motor.motor_asyncio
from urllib.parse import quote_plus

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://iamsadiz:' + quote_plus('Dream@2003') + '@bookstore.agiz4wl.mongodb.net/?retryWrites=true&w=majority&appName=Bookstore')

database = client.RecipesList
collection = database.recipes

async def fetch_one_recipe(title):
    document = await collection.find_one({"title": title})
    return document

# async def fetch_all_recipes():
#     recipes = []
#     cursor = collection.find({})
#     async for document in cursor:
#         recipes.append(Recipe(**document))
#     return recipes
async def fetch_all_recipes():
    recipes = []
    cursor = collection.find({})
    async for document in cursor:
        # Ensure that the 'ingredients' field is converted to a list of dictionaries
        ingredients = document.get('ingredients', [])  # Retrieve the 'ingredients' field or default to an empty list
        if not isinstance(ingredients, list):
            raise ValueError("Ingredients field must be a list")

        # Append the recipe with the corrected 'ingredients' field
        recipes.append(Recipe(title=document['title'], description=document['description'], ingredients=ingredients))
    return recipes


async def create_recipe(recipe):
    document = recipe
    result = await collection.insert_one(document)
    return document

# async def update_recipe(title,ingredients):
#     await collection.update_one({"title": title}, {"$set": {"ingredients": ingredients}})
#     document = await collection.find_one({"title":title})
#     return document

async def update_recipe(title, recipe):
    ingredients = recipe['ingredients']
    # Validate ingredients format
    print("================ ", type(ingredients))
    if not isinstance(ingredients, list):
        raise ValueError("Ingredients must be a list")
    for ingredient in ingredients:
        if not isinstance(ingredient, dict):
            raise ValueError("Each ingredient must be a dictionary")
        if not all(key in ingredient for key in ("name", "C")):
            raise ValueError("Each ingredient dictionary must have 'name' and 'amount' keys")

    # Update the recipe in the database
    await collection.update_one({"title": title}, {"$set": {"ingredients": ingredients}})
    
    # Return the updated recipe document
    document = await collection.find_one({"title": title})
    return document



async def remove_recipe(title):
    await collection.delete_one({"title": title})
    return True