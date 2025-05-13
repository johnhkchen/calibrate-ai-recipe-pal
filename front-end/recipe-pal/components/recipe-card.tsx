"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Leaf, Copy, Check, Settings2 } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isCopied, setIsCopied] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [modificationType, setModificationType] = useState<string>("")
  const [customModification, setCustomModification] = useState<string>("")
  const { toast } = useToast()

  // Set initial vegan status after component mounts
  useEffect(() => {
    setIsVegan(recipe.isVegan || false)
  }, [recipe.isVegan])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleVeganToggle = (checked: boolean) => {
    setIsVegan(checked)
    startTransition(async () => {
      await toggleVeganStatus(recipe.id, checked)
    })
  }

  const copyToClipboard = async (text: string) => {
    try {
      // Always use the fallback method for Tailscale compatibility
      const textArea = document.createElement('textarea')
      textArea.value = text
      
      // Make the textarea out of viewport
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const successful = document.execCommand('copy')
        textArea.remove()
        return successful
      } catch (err) {
        console.error('Failed to copy:', err)
        textArea.remove()
        return false
      }
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }

  const copyRecipeToClipboard = async (modificationQuery?: string) => {
    const recipeText = modificationQuery
      ? `
Modification Request: ${modificationQuery}

${recipe.name}
${recipe.description}

Ingredients:
${recipe.ingredients.map(ing => `- ${ing.quantity} ${ing.unit || ''} ${ing.name}`).join('\n')}

Instructions:
${recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}
      `.trim()
      : `
${recipe.name}
${recipe.description}

Ingredients:
${recipe.ingredients.map(ing => `- ${ing.quantity} ${ing.unit || ''} ${ing.name}`).join('\n')}

Instructions:
${recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}
      `.trim()

    const success = await copyToClipboard(recipeText)
    
    if (success) {
      setIsCopied(true)
      toast({
        title: "Copied to clipboard",
        description: modificationQuery ? "Modified recipe has been copied to your clipboard" : "Recipe has been copied to your clipboard",
        duration: 2000,
      })
      setTimeout(() => setIsCopied(false), 2000)
      if (isDialogOpen) {
        setIsDialogOpen(false)
        setModificationType("")
        setCustomModification("")
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to copy recipe to clipboard",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  const handleModifyAndCopy = () => {
    let modificationQuery = ""
    
    switch (modificationType) {
      case "vegetarian":
        modificationQuery = "Make this recipe vegetarian"
        break
      case "double":
        modificationQuery = "Double all portions in this recipe"
        break
      case "half":
        modificationQuery = "Halve all portions in this recipe"
        break
      case "custom":
        modificationQuery = customModification
        break
      default:
        return
    }

    copyRecipeToClipboard(modificationQuery)
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyRecipeToClipboard()}
              className="h-8 w-8"
              title="Copy recipe to clipboard"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title="Modify recipe"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Modify Recipe</DialogTitle>
                  <DialogDescription>
                    Choose how you want to modify this recipe. The recipe will be copied to your clipboard with the modification request.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Select
                    value={modificationType}
                    onValueChange={setModificationType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select modification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Make Vegetarian</SelectItem>
                      <SelectItem value="double">Double Portions</SelectItem>
                      <SelectItem value="half">Half Portions</SelectItem>
                      <SelectItem value="custom">Custom Modification</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {modificationType === "custom" && (
                    <Input
                      placeholder="Enter your modification request..."
                      value={customModification}
                      onChange={(e) => setCustomModification(e.target.value)}
                    />
                  )}

                  <Button 
                    className="w-full"
                    onClick={handleModifyAndCopy}
                    disabled={!modificationType || (modificationType === "custom" && !customModification)}
                  >
                    Copy Modified Recipe
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <button
              onClick={toggleExpand}
              className="p-1 rounded-full hover:bg-muted transition-colors"
              aria-label={isExpanded ? "Collapse recipe details" : "Expand recipe details"}
            >
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
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
