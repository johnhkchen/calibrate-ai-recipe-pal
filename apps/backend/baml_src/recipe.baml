// Defining a data model.
class Ingredient {
  name string
  quantity string
  unit string
}

class Recipe {
  name string
  description string
  ingredients Ingredient[]
  instructions string[]
}

// Create a function to extract the resume from a string.
function ExtractRecipe(recipe: string) -> Recipe {
  // Specify a client as provider/model-name
  // you can use custom LLM params with a custom client name from clients.baml like "client CustomHaiku"
  client "openai/gpt-4o" // Set OPENAI_API_KEY to use this client.
  prompt #"
    Extract from this content:
    {{ recipe }}

    {{ ctx.output_format }}
  "#
}



// Test the function with a sample resume. Open the VSCode playground to run this.
test biscuits_recipe {
  functions [ExtractRecipe]
  args {
    recipe #"
    Two cups scalded milk, 3 tablespoons butter, 2 tablespoons sugar, 2 teaspoons salt, 1 yeast cake dissolved in 1/4 cup luke warm water, 3 cups flour. Add butter, sugar and salt to milk when luke warm water; add yeast and flour, beat thoroughly; cover and let rise until light, cut down and add enough flour to knead about 2 1/2 cups and let rise again after the second rising; take and toss slightly on a floured board; knead well and roll out to 1/8 inch thickness; shape with biscuit cutter; take a case knife handle dipped in flour and make a crease through the middle of each piece; brush over one-half of each piece with melted butter, fold and press the edges together; place in a well-greased pan one inch apart and let rise until light; bake in a hot oven 12 to 15 minutes.
    "#
  }
}
