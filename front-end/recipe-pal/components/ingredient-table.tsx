import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Ingredient } from "@/types/recipe"

interface IngredientTableProps {
  ingredients: Ingredient[]
}

export function IngredientTable({ ingredients }: IngredientTableProps) {
  // Calculate total price for each ingredient
  const ingredientsWithTotal = ingredients.map((ingredient) => ({
    ...ingredient,
    totalPrice: Number.parseFloat((ingredient.pricePerUnit * ingredient.quantity).toFixed(2)),
  }))

  // Calculate total recipe cost
  const totalRecipeCost = ingredientsWithTotal.reduce((sum, ingredient) => sum + ingredient.totalPrice, 0).toFixed(2)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead className="text-right">Price/Unit</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredientsWithTotal.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{ingredient.name}</TableCell>
              <TableCell className="text-right">${ingredient.pricePerUnit.toFixed(2)}</TableCell>
              <TableCell className="text-right">{ingredient.quantity}</TableCell>
              <TableCell className="text-right">${ingredient.totalPrice.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Recipe Cost</TableCell>
            <TableCell className="text-right font-bold">${totalRecipeCost}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
