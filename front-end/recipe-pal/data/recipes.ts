import type { Recipe } from "@/types/recipe"

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, and pancetta",
    image: "/placeholder.svg?height=200&width=400&text=Carbonara",
    isVegan: false,
    ingredients: [
      { name: "Spaghetti", pricePerUnit: 1.5, quantity: 1 },
      { name: "Eggs", pricePerUnit: 0.25, quantity: 3 },
      { name: "Pancetta", pricePerUnit: 3.5, quantity: 0.25 },
      { name: "Parmesan Cheese", pricePerUnit: 4.0, quantity: 0.2 },
      { name: "Black Pepper", pricePerUnit: 0.1, quantity: 2 },
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
      "While pasta cooks, cut pancetta into small cubes and fry until crispy.",
      "In a bowl, whisk eggs and grated parmesan cheese together.",
      "Drain pasta, reserving a small cup of pasta water.",
      "Working quickly, add hot pasta to pancetta, then remove from heat and add egg mixture, stirring constantly.",
      "Add a splash of pasta water to create a creamy sauce. Season with black pepper and serve immediately.",
    ],
  },
  {
    id: "2",
    name: "Chicken Tikka Masala",
    description: "Grilled chicken chunks in a creamy spiced tomato sauce",
    image: "/placeholder.svg?height=200&width=400&text=Tikka+Masala",
    isVegan: false,
    ingredients: [
      { name: "Chicken Breast", pricePerUnit: 3.0, quantity: 2 },
      { name: "Yogurt", pricePerUnit: 1.2, quantity: 0.5 },
      { name: "Tomato Sauce", pricePerUnit: 1.8, quantity: 1 },
      { name: "Heavy Cream", pricePerUnit: 2.5, quantity: 0.5 },
      { name: "Garam Masala", pricePerUnit: 0.3, quantity: 3 },
      { name: "Garlic", pricePerUnit: 0.1, quantity: 4 },
      { name: "Ginger", pricePerUnit: 0.2, quantity: 2 },
    ],
    instructions: [
      "Cut chicken into bite-sized pieces and marinate in yogurt and spices for at least 1 hour.",
      "Thread chicken onto skewers and grill or broil until charred and cooked through.",
      "In a large pan, sauté onions, garlic, and ginger until soft.",
      "Add tomato sauce and spices, simmer for 10 minutes.",
      "Stir in heavy cream and simmer for another 5 minutes.",
      "Add grilled chicken to the sauce and heat through.",
      "Garnish with fresh cilantro and serve with rice or naan bread.",
    ],
  },
  {
    id: "3",
    name: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry with soy sauce",
    image: "/placeholder.svg?height=200&width=400&text=Stir+Fry",
    isVegan: true,
    ingredients: [
      { name: "Bell Peppers", pricePerUnit: 1.0, quantity: 2 },
      { name: "Broccoli", pricePerUnit: 1.5, quantity: 1 },
      { name: "Carrots", pricePerUnit: 0.3, quantity: 3 },
      { name: "Snow Peas", pricePerUnit: 2.0, quantity: 0.5 },
      { name: "Soy Sauce", pricePerUnit: 0.2, quantity: 4 },
      { name: "Sesame Oil", pricePerUnit: 0.5, quantity: 2 },
      { name: "Garlic", pricePerUnit: 0.1, quantity: 3 },
    ],
    instructions: [
      "Prepare all vegetables by washing and cutting into bite-sized pieces.",
      "Heat a wok or large frying pan over high heat and add sesame oil.",
      "Add garlic and stir for 30 seconds until fragrant.",
      "Add vegetables in order of cooking time: carrots first, then broccoli, bell peppers, and snow peas last.",
      "Stir-fry for 5-7 minutes until vegetables are crisp-tender.",
      "Add soy sauce and any other desired seasonings.",
      "Serve hot over rice or noodles.",
    ],
  },
  {
    id: "4",
    name: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies with a soft center",
    image: "/placeholder.svg?height=200&width=400&text=Cookies",
    isVegan: false,
    ingredients: [
      { name: "All-Purpose Flour", pricePerUnit: 0.5, quantity: 2.25 },
      { name: "Butter", pricePerUnit: 1.2, quantity: 1 },
      { name: "Brown Sugar", pricePerUnit: 0.8, quantity: 0.75 },
      { name: "White Sugar", pricePerUnit: 0.6, quantity: 0.75 },
      { name: "Eggs", pricePerUnit: 0.25, quantity: 2 },
      { name: "Vanilla Extract", pricePerUnit: 0.3, quantity: 2 },
      { name: "Chocolate Chips", pricePerUnit: 3.0, quantity: 2 },
      { name: "Baking Soda", pricePerUnit: 0.1, quantity: 1 },
      { name: "Salt", pricePerUnit: 0.05, quantity: 0.5 },
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, mix flour, baking soda, and salt.",
      "In a large bowl, cream together butter and both sugars until smooth.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Gradually blend in the dry ingredients.",
      "Fold in chocolate chips.",
      "Drop by rounded tablespoons onto ungreased baking sheets.",
      "Bake for 9 to 11 minutes or until golden brown.",
      "Let stand on baking sheet for 2 minutes before removing to cool on wire racks.",
    ],
  },
  {
    id: "5",
    name: "Avocado Toast",
    description: "Simple and nutritious breakfast with avocado on toast",
    image: "/placeholder.svg?height=200&width=400&text=Avocado+Toast",
    isVegan: true,
    ingredients: [
      { name: "Avocado", pricePerUnit: 1.5, quantity: 1 },
      { name: "Bread", pricePerUnit: 0.3, quantity: 2 },
      { name: "Lemon Juice", pricePerUnit: 0.2, quantity: 1 },
      { name: "Red Pepper Flakes", pricePerUnit: 0.1, quantity: 1 },
      { name: "Salt", pricePerUnit: 0.05, quantity: 0.5 },
      { name: "Olive Oil", pricePerUnit: 0.4, quantity: 1 },
    ],
    instructions: [
      "Toast the bread slices until golden and crisp.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Add lemon juice, salt, and mash with a fork to desired consistency.",
      "Spread the avocado mixture on the toast.",
      "Drizzle with olive oil and sprinkle with red pepper flakes.",
      "Optional: top with additional ingredients like eggs, tomatoes, or feta cheese.",
    ],
  },
  {
    id: "6",
    name: "Greek Salad",
    description: "Fresh Mediterranean salad with feta cheese and olives",
    image: "/placeholder.svg?height=200&width=400&text=Greek+Salad",
    isVegan: false,
    ingredients: [
      { name: "Cucumber", pricePerUnit: 0.8, quantity: 1 },
      { name: "Tomatoes", pricePerUnit: 0.5, quantity: 3 },
      { name: "Red Onion", pricePerUnit: 0.4, quantity: 0.5 },
      { name: "Feta Cheese", pricePerUnit: 3.0, quantity: 0.5 },
      { name: "Kalamata Olives", pricePerUnit: 2.5, quantity: 0.5 },
      { name: "Olive Oil", pricePerUnit: 0.4, quantity: 3 },
      { name: "Lemon Juice", pricePerUnit: 0.2, quantity: 2 },
      { name: "Oregano", pricePerUnit: 0.1, quantity: 1 },
    ],
    instructions: [
      "Chop cucumber, tomatoes, and red onion into bite-sized pieces.",
      "Combine vegetables in a large bowl.",
      "Add olives and crumbled feta cheese.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over salad and toss gently to combine.",
      "Let sit for 10 minutes before serving to allow flavors to meld.",
      "Serve chilled or at room temperature.",
    ],
  },
]
