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
        "unit": ingredient.unit
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
    recipe_text = "Boil till tender 3 lbs. of halibut; cut fine and bone. Add 1 pt. of cream and 2 cups of bread crumbs from inside of bread; season with salt, pepper and paprika. Bake in a bread pan lined with waxed paper; put pan in pan of hot water and bake 1 to 1¼ of an hour. Cut and serve in slices with nut sauce. Sauce: One-quarter to ½ lb. of well chopped, blanched almonds, 3 large tablespoons butter; put in frying pan and brown nuts chopped in it. Add to this 1 pt. of sweet cream and season.."
    return parse_recipe(recipe_text)

@app.get("/prices")
async def prices():
  return query_prices()
