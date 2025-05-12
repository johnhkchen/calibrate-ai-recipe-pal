from baml_client.sync_client import b
from baml_client.types import Recipe

def example(raw_recipe: str) -> Recipe: 
  # BAML's internal parser guarantees ExtractResume
  # to be always return a Resume type
  response = b.ExtractRecipe(raw_recipe)
  return response


print(example("Two cups scalded milk, 3 tablespoons butter, 2 tablespoons sugar, 2 teaspoons salt, 1 yeast cake dissolved in 1/4 cup luke warm water, 3 cups flour. Add butter, sugar and salt to milk when luke warm water; add yeast and flour, beat thoroughly; cover and let rise until light, cut down and add enough flour to knead about 2 1/2 cups and let rise again after the second rising; take and toss slightly on a floured board; knead well and roll out to 1/8 inch thickness; shape with biscuit cutter; take a case knife handle dipped in flour and make a crease through the middle of each piece; brush over one-half of each piece with melted butter, fold and press the edges together; place in a well-greased pan one inch apart and let rise until light; bake in a hot oven 12 to 15 minutes."))
