export interface Ingredient {
  name: string
  pricePerUnit: number
  quantity: number
}

export interface Recipe {
  id: string
  name: string
  description: string
  image?: string
  ingredients: Ingredient[]
  instructions: string[]
}
