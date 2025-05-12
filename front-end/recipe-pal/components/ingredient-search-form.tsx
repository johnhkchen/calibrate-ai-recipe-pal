"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IngredientSearchFormProps {
  onSearch: (ingredients: string[]) => Promise<void>
  isLoading: boolean
}

export function IngredientSearchForm({ onSearch, isLoading }: IngredientSearchFormProps) {
  const [ingredients, setIngredients] = useState<string[]>([""])

  const addIngredient = () => {
    if (ingredients.length < 20) {
      setIngredients([...ingredients, ""])
    }
  }

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(index, 1)
    setIngredients(newIngredients.length ? newIngredients : [""]) // Always keep at least one input
  }

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Filter out empty ingredients
    const filteredIngredients = ingredients.filter((ing) => ing.trim() !== "")
    if (filteredIngredients.length > 0) {
      await onSearch(filteredIngredients)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Find Recipes by Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder="Enter an ingredient"
                  className="flex-1"
                />
                {ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    aria-label="Remove ingredient"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {index === ingredients.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addIngredient}
                    aria-label="Add ingredient"
                    disabled={ingredients.length >= 20} // Limit to 20 total ingredients
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          {ingredients.length > 5 && (
            <p className="text-xs text-muted-foreground text-center">
              Scroll to see all {ingredients.length} ingredients
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Searching..." : "Find Recipes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
