import { NextResponse } from "next/server"
import { recipes } from "@/data/recipes"

export async function GET() {
  try {
    // Simulate a slight delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({ recipes })
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 })
  }
}
