"use client"

import { useState, useEffect } from "react"
import { RecipeCard } from "@/components/recipe-card"
import { IngredientSearchForm } from "@/components/ingredient-search-form"
import type { Recipe } from "@/types/recipe"
import { Utensils } from "lucide-react"

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch initial recipes when component mounts
  useEffect(() => {
    fetchInitialRecipes()
  }, [])

  const fetchInitialRecipes = async () => {
    setIsLoading(true)
    setError(null)

    try {
      
      const response = await fetch("http://100.114.95.71:8000/api/recipes")
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch recipes")
      }

      const data = await response.json()
      setRecipes(data.data)
    } catch (error) {
      console.error("Error fetching recipes:", error)
      setError("Failed to load recipes. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const searchRecipes = async (ingredients: string[]) => {
    setIsLoading(true)
    setError(null)

    try {
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
      setError("Failed to search recipes. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-b from-green-600 to-green-700 text-white py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Utensils className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Recipe Collection</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover delicious recipes and toggle them to vegan alternatives with a simple switch!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <IngredientSearchForm onSearch={searchRecipes} isLoading={isLoading} />

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Loading recipes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl text-red-500">{error}</p>
            <button
              onClick={fetchInitialRecipes}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </main>
  )
}
