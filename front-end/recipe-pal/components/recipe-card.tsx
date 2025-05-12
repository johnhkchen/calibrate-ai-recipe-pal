"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Leaf } from "lucide-react"
import { useTransition } from "react"

import type { Recipe } from "@/types/recipe"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IngredientTable } from "@/components/ingredient-table"
import { RecipeInstructions } from "@/components/recipe-instructions"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { toggleVeganStatus } from "@/app/actions/recipe-actions"
import { Badge } from "@/components/ui/badge"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVegan, setIsVegan] = useState(recipe.isVegan)
  const [isPending, startTransition] = useTransition()

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleVeganToggle = (checked: boolean) => {
    setIsVegan(checked)
    startTransition(async () => {
      await toggleVeganStatus(recipe.id, checked)
    })
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={recipe.image || "/placeholder.svg?height=200&width=400"}
          alt={recipe.name}
          fill
          className="object-cover"
        />
        {isVegan && (
          <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
            <Leaf className="h-3 w-3 mr-1" /> Vegan
          </Badge>
        )}
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
      <CardContent className="flex items-center justify-between pt-0 pb-4">
        <div className="flex items-center space-x-2">
          <Leaf className={cn("h-4 w-4", isVegan ? "text-green-600" : "text-gray-400")} />
          <span className="text-sm font-medium">Vegan</span>
        </div>
        <Switch
          checked={isVegan}
          onCheckedChange={handleVeganToggle}
          disabled={isPending}
          aria-label="Toggle vegan status"
        />
      </CardContent>
    </Card>
  )
}
