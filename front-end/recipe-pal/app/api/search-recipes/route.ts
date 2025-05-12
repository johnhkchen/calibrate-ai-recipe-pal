import { NextResponse } from "next/server"
import { recipes } from "@/data/recipes"

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json()

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json({ error: "Invalid request. Ingredients must be an array." }, { status: 400 })
    }

    // Convert ingredients to lowercase for case-insensitive matching
    const searchIngredients = ingredients.map((i) => i.toLowerCase())

    // Filter recipes that contain at least one of the specified ingredients
    const filteredRecipes = recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) => i.name.toLowerCase())
      return searchIngredients.some((ingredient) =>
        recipeIngredients.some((recipeIngredient) => recipeIngredient.includes(ingredient)),
      )
    })

    // Simulate a delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({ recipes: filteredRecipes })
  } catch (error) {
    console.error("Error processing recipe search:", error)
    return NextResponse.json({ error: "Failed to process recipe search" }, { status: 500 })
  }
}
