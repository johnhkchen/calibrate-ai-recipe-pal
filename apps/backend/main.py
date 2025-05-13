from dotenv import load_dotenv
load_dotenv() 

import os
from opik import track
from supabase import create_client, Client
from baml_client.sync_client import b
from baml_client.types import Recipe

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def ingredient_to_dict(ingredient):
    """Convert an Ingredient object to a dictionary for JSON serialization."""
    return {
        "name": ingredient.name,
        "quantity": ingredient.quantity,
        "unit": ingredient.unit,
        "pricePerUnit": ingredient.pricePerUnit,
    }

@track
def parse_recipe(raw_recipe: str): 
  # Convert Ingredient objects to dictionaries
  response = b.ExtractRecipe(raw_recipe)
  ingredients_dict = [ingredient_to_dict(ingredient) for ingredient in response.ingredients]

  results = (
      supabase.table("recipes")
      .insert({
          "name": response.name,
          "description": response.description,
          "ingredients": ingredients_dict,
          "instructions": response.instructions
      })
      .execute()
  )
  return results

@track
def query_prices():
  print(supabase)
  response = (
    supabase.table("prices")
    .select("*")
    .execute()
  )
  print(response)
  return response.data

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost",
    "https://pipe.b28.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/recipe/insert")
async def insert_sample_recipe():
    recipe_text = ("""

CRAB MEAT CANAPES

- 1 cup crab meat
- 1 teaspoon Worcestershire sauce
- ½ teaspoon paprika
- ½ teaspoon salt
- 1 teaspoon mustard
- ½ teaspoon horseradish

Chop crab meat, mix well with seasonings, and spread on thin rounds of untoasted brown bread. Garnish with small cube of lemon.

"""
    )
    return parse_recipe(recipe_text)

@app.post("/api/recipe")
async def add_recipe(recipe_text):
    return parse_recipe(recipe_text)

@app.get("/api/recipes")
async def get_recipes():
    results = (
        supabase.table("recipes")
        .select("*")
        .execute()
    )
    return results

@app.get("/prices")
async def prices():
  return query_prices()

@app.get("/api/ingredients")
async def list_all_ingredients():
    results = (
        supabase.table("recipes")
        .select("id, ingredients")
        .execute()
    )
    # return results
    ingredients = {}
    for recipe in results.data:
        for ingredient in recipe["ingredients"]:
            name = ingredient["name"].lower()
            if name in ingredients:
                ingredients[name].append(recipe["id"])
            ingredients[name] = [recipe["id"]]
    return ingredients

@app.get("/api/recipe_by_ingredient")
async def list_recipes_using(ingredient):
    results = (
        supabase.table("recipes")
        .select("id, ingredients")
        .execute()
    )
    # return results
    recipe_ids = []
    for recipe in results.data:
        for ingredient_used in recipe["ingredients"]:
            if ingredient_used.lower() == ingredient:
                recipe_ids.append(recipe["id"])
    return recipe_ids

