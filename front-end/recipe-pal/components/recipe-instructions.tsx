interface RecipeInstructionsProps {
  instructions: string[]
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  return (
    <div className="space-y-4">
      <ol className="list-decimal list-inside space-y-2">
        {instructions.map((step, index) => (
          <li key={index} className="pl-2">
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}
