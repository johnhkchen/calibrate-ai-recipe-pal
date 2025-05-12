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
  return parse_recipe("Two cups scalded milk, 3 tablespoons butter, 2 tablespoons sugar, 2 teaspoons salt, 1 yeast cake dissolved in 1/4 cup luke warm water, 3 cups flour. Add butter, sugar and salt to milk when luke warm water; add yeast and flour, beat thoroughly; cover and let rise until light, cut down and add enough flour to knead about 2 1/2 cups and let rise again after the second rising; take and toss slightly on a floured board; knead well and roll out to 1/8 inch thickness; shape with biscuit cutter; take a case knife handle dipped in flour and make a crease through the middle of each piece; brush over one-half of each piece with melted butter, fold and press the edges together; place in a well-greased pan one inch apart and let rise until light; bake in a hot oven 12 to 15 minutes.")

@app.get("/prices")
async def prices():
  return query_prices()
