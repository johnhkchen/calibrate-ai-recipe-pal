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

app = FastAPI()


@app.get("/api/test")
async def root():
    recipe_text = (
        "Baked Fillet of Fish: Two slices of halibut cut from middle of fish, salt, pepper, lemon juice, melted butter, 2 cups oyster stuffing. Wash and wipe fish. Place one slice on a buttered fish sheet, brush with melted butter, sprinkle with salt and pepper, cover with oyster stuffing. Place second slice on top of oysters, season, and brush with butter. Bake 40 minutes, basting frequently with melted butter, turning pan often in order that the fish may be uniformly browned. Remove to hot platter; garnish with potato balls, parsley, and lemon; Hollandaise, tomato, or Bechamel sauce."
    )
    return parse_recipe(recipe_text)

@app.get("/api/demo")
async def root():
    results = (
        supabase.table("recipes")
        .select("*")
        .execute()
    )
    return results

@app.get("/prices")
async def prices():
  return query_prices()
