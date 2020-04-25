export interface Ingredient {
    quantity: number | "to taste";
    measurement?: string;
    style?: "diced" | "minced";
    item: string;
}

export interface RecipeDetails {
    name: string;
    author?: string;
    link?: string;
    tools: string;
    timing: {
        prepTime: string;
        cookTime: string;
        totalTime: string;
    };
    output?: {
        amount: number;
        unit: string;
    };
}

export interface Recipe extends RecipeDetails {
    id: string;
    ingredients: Ingredient[];
    directions: string[];
    notes?: string[];
    relatedRecipes?: {
        prev?: string[];
        next?: string[];
    };
}

export const FIREHOUSE_CHILI: Recipe = {
    id: "firehouse-chili",
    name: "Fire House Chili",
    author: "Auntie Don",
    tools: "Crock Pot or Large Stovetop Pot",
    timing: {
        prepTime: "15 minutes",
        cookTime: "6 hours",
        totalTime: "6 hours 30 minutes"
    },
    output: {
        amount: 12,
        unit: "bowl"
    },
    ingredients: [
        { quantity: 2, measurement: "lb", item: "lean ground beef" },
        { quantity: 2, measurement: "lb", item: "hot italian sausage" },
        { quantity: 2, style: "diced", item: "large onion" },
        { quantity: 1, measurement: "tbsp", style: "minced", item: "garlic" },
        { quantity: 1, measurement: "qt", item: "canned tomatoes" },
        { quantity: 12, measurement: "oz", item: "tomato paste" },
        { quantity: 1, measurement: "cup", style: "diced", item: "green peppers" },
        { quantity: 2, measurement: "tbsp", item: "instant decaf coffee" },
        { quantity: 2, measurement: "tbsp", item: "sugar" },
        { quantity: 0.75, measurement: "cup", item: "chili powder" },
        { quantity: 2, measurement: "tbsp", item: "paprika" },
        { quantity: 2, measurement: "tbsp", item: "oregano" },
        { quantity: 2, measurement: "tbsp", item: "dried parsley" },
        { quantity: 1, measurement: "tsp", item: "cumin" },
        { quantity: 12, measurement: "oz", item: "beer" },
        { quantity: 1, measurement: "can", item: "chili beans with sauce" },
        { quantity: 1, measurement: "can", item: "refried pinto beans" },
        { quantity: 3, measurement: "can", item: "dark red kidney beans" },
        { item: "salt", quantity: "to taste" },
        { item: "pepper", quantity: "to taste" }
    ],
    directions: [
        "Brown beef, pork sausage, onion and garlic.",
        "Add tomatoes and tomato paste, green peppers, coffee, sugar, spices and beer.",
        "Bring to a boil and cover.",
        "Simmer for two hours on high.",
        "Mix chili beans, refried beans, and kidney beans together and stir in to chili.",
        "Simmer an additional 3-4 hours on low."
    ],
    notes: [
        "The original recipe did not have kidney beans. I like them, so added.",
        "My husband belonged to local fire department and this is the recipe they used."
    ]
};

export const SOURDOUGH_BREAD: Recipe = {
    id: "sourdough-bread",
    name: "Sourdough Bread",
    link: "https://www.kingarthurflour.com/learn/guides/sourdough/bake",
    tools: "Oven",
    timing: {
        prepTime: "4 hours 40 minutes",
        cookTime: "40 minutes",
        totalTime: "5 hours 20 minutes"
    },
    output: {
        amount: 2,
        unit: "boule"
    },
    ingredients: [
        { quantity: 454, measurement: "g", item: "ripe (fed) sourdough starter" },
        { quantity: 602, measurement: "g", item: "flour" },
        { quantity: 85, measurement: "g", item: "whole wheat flour" },
        { quantity: 397, measurement: "g", item: "water (room temperature)" },
        { quantity: 2.5, measurement: "tsp", item: "salt" }
    ],
    directions: [
        "Combine the flours, water, and starter in a large bowl and mix well, until all of the flour is moistened and the dough ahs formed a cohesive mass.",
        "Cover the dough and let it rest for 20 minutes.",
        "Add the salt and knead the dough until it is smooth and supple, though still somewhat soft and tacky. Place the dough back in the bowl, cover, and let it rise for 1 hour.",
        "Give the dough a fold (like a business letter). Turn the dough 90 degrees and repeat. Return the doug hto the bowl, cover, and let it rise for another hour.",
        "Turn out the dough onto a lightly floured surface and divide in half if needed. Gently shape into rounds, cover, and let rest for 20 minutes.",
        "Shape the loaves into boules, cover, and let rise until light and airy, about 2 to 2.5 hours. Place a cast iron pan in the oven on the bottom rack.",
        "Preheat the oven to 450 F. If using a baking stone, leave it in the oven and start this process ~1 hour before the loaves are risen.",
        "When the loaves have risen, gently turn them out of their bowls and slash them with a sharp knife. place them onto a baking stone or parchment paper lined baking sheet.",
        "Place the parchment directly onto the stone (or place your lined sheet in the oven) and add 1 cup of boiling water to the heated cast iron pan in the oven to steam the bread.",
        "Bake the bread until it is crusty and golden, approximately 30 to 40 minutes.",
        "Remove the bread from the oven and place on a rack to cool before slicing."
    ],
    relatedRecipes: {
        next: [ "kvass" ]
    }
};

export const KVASS: Recipe = {
    id: "kvass",
    name: "Kvass",
    link: "https://www.fermentingforfoodies.com/traditonal-sourdough-kvass/",
    tools: "Oven, Fermenting Container and Bottles",
    timing: {
        prepTime: "15 minutes",
        cookTime: "6 hours",
        totalTime: "6 hours 30 minutes"
    },
    output: {
        amount: 3,
        unit: "liter"
    },
    ingredients: [
        { quantity: 1, measurement: "lb", item: "bread" },
        { quantity: 3, measurement: "L", item: "water" },
        { quantity: 1, measurement: "tbsp", item: "sourdough starter" }
    ],
    directions: [
        "Cut the bread into cubes and toast it in the oven at 350F for 20 min. tossing halfway through.",
        "Combine 3 liters of boiling water with the dried bread in a bowl and let it soak for at least 4 hours (up to 24 hours).",
        "Strain liquid into a fermentation container and add in the sugar and yeast, along with any additional flavors you want to use.",
        "Leave the fermentation container in a warm location to ferment for around 1 week. It will start to foam significantly after 6-12 hours.",
        "After one week, strain the kvass into bottles and store in the fridge. The kvass will continue to ferment and build up pressure, so use appropriate containers, and release the pressure every few days until it stops building up carbonation.",
        "After three days in the fridge, it is ready to drink, and will keep for another 1-2 weeks."
    ],
    relatedRecipes: {
        prev: [ "sourdough-bread" ]
    }
};

export default {
    [FIREHOUSE_CHILI.id]: FIREHOUSE_CHILI,
    [SOURDOUGH_BREAD.id]: SOURDOUGH_BREAD,
    [KVASS.id]: KVASS
};
