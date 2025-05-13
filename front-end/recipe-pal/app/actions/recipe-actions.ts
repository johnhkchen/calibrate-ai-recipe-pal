"use server"

import { revalidatePath } from "next/cache"
import { recipes } from "@/data/recipes"

export async function toggleVeganStatus(id: string, isVegan: boolean) {
  try {
    // In a real app, this would update a database
    // For this demo, we'll just simulate the update
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex !== -1) {
      recipes[recipeIndex].isVegan = isVegan
    }

    // Simulate a delay for the server action
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Revalidate the recipes path to refresh the data
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error toggling vegan status:", error)
    return { success: false, error: "Failed to update recipe" }
  }
}
