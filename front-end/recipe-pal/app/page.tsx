"use client"

import { useState } from "react"
import { RecipeCard } from "@/components/recipe-card"
import { IngredientSearchForm } from "@/components/ingredient-search-form"
import { recipes as initialRecipes } from "@/data/recipes"
import type { Recipe } from "@/types/recipe"

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [isLoading, setIsLoading] = useState(false)

  const searchRecipes = async (ingredients: string[]) => {
    setIsLoading(true)
    try {
      // Make the POST request to search for recipes
      const response = await fetch("/api/search-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok) {
        throw new Error("Failed to search recipes")
      }

      const data = await response.json()
      setRecipes(data.recipes)
    } catch (error) {
      console.error("Error searching recipes:", error)
      // You could add error handling UI here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Recipe Collection</h1>

      <IngredientSearchForm onSearch={searchRecipes} isLoading={isLoading} />

      {recipes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* The number of rows will depend on the data received from the server */}
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No recipes found with those ingredients.</p>
          <p className="text-gray-400 mt-2">Try different ingredients or fewer ingredients.</p>
        </div>
      )}
    </main>
  )
}
