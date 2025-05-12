"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

import type { Recipe } from "@/types/recipe"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IngredientTable } from "@/components/ingredient-table"
import { RecipeInstructions } from "@/components/recipe-instructions"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={recipe.image || "/placeholder.svg?height=200&width=400"}
          alt={recipe.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{recipe.name}</CardTitle>
          <button
            onClick={toggleExpand}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label={isExpanded ? "Collapse recipe details" : "Expand recipe details"}
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-0">
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              <TabsContent value="ingredients" className="mt-4">
                <IngredientTable ingredients={recipe.ingredients} />
              </TabsContent>
              <TabsContent value="instructions" className="mt-4">
                <RecipeInstructions instructions={recipe.instructions} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
