export interface Ingredient {
    quantity: number | "to taste";
    measurement?: string;
    style?: "diced" | "minced";
    item: string;
}

export interface Direction {
    instructions: string;
    time: number; // in minutes
    elapsedTime: number; // in minutes
}

export interface RecipeListDetails {
    id: string;
    name: string;
}

export type RecipeListKey = "entree" | "side" | "beverage" | "dessert";

export interface RecipeList {
    entree: RecipeListDetails[];
    side: RecipeListDetails[];
    beverage: RecipeListDetails[];
    dessert: RecipeListDetails[];
}

export interface RecipeDetails extends RecipeListDetails {
    author?: string;
    link?: string;
    tools: string;
    timing: {
        prepTime: number;
        cookTime: number;
        totalTime: number;
    };
    output?: {
        amount: number;
        unit: string;
    };
    image?: string;
    video?: string;
}

export interface Recipe extends RecipeDetails {
    ingredients: Ingredient[];
    directions: Direction[];
    notes?: string[];
    relatedRecipes?: {
        prev?: RecipeListDetails[];
        next?: RecipeListDetails[];
    };
}
