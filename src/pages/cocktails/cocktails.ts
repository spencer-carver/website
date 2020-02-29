export enum Glass {
    lowball = "lowball",
    highball = "highball",
    coupe = "coupe",
    martini = "martini",
    hurricane = "hurricane"
}

export interface Cocktail {
    name: string;
    ingredients: string[];
    glass: Glass;
    description?: string;
    link: string;
}

const COCKTAILS: Cocktail[] = [
    {
        name: "Amaretto Sour",
        ingredients: [
            "Amaretto",
            "Bourbon",
            "Lemon Juice",
            "Rich Simple Syrup",
            "Egg White"
        ],
        glass: Glass.lowball,
        link: "https://www.jeffreymorgenthaler.com/i-make-the-best-amaretto-sour-in-the-world/"
    }, {
        name: "Aviation",
        ingredients: [
            "Gin",
            "Maraschino",
            "Lemon Juice",
            "Crème de Violette"
        ],
        glass: Glass.coupe,
        link: "https://www.luxardo.it/liqueurs-and-distillates/maraschino-originale/"
    },
    {
        name: "Hurricane",
        ingredients: [
            "White Rum",
            "Dark Rum",
            "Lime Juice",
            "Orange Juice",
            "Passion Fruit Puree",
            "Simple Syrup",
            "Grenadine"
        ],
        glass: Glass.hurricane,
        link: "https://www.liquor.com/recipes/hurricane/"
    },
    {
        name: "Little Devil",
        ingredients: [
            "Vodka",
            "Ancho Reyes Chile Liqueur",
            "Lemon Juice",
            "Maple Syrup",
            "Club Soda"
        ],
        glass: Glass.highball,
        link: "https://www.youtube.com/watch?v=w4KGTNH2Tkk"
    },
    {
        name: "Pimm's & Ginger",
        ingredients: [
            "Pimm's No. 1",
            "Ginger Ale"
        ],
        glass: Glass.highball,
        link: "https://www.anyoneforpimms.com/recipes/pimm-s-ginger"
    },
    {
        name: "Ponche Creme",
        ingredients: [
            "Dark Rum",
            "Eggs",
            "Sweetened Condensed Milk",
            "Angostura Bitters",
            "Nutmeg",
            "Lime Zest"
        ],
        glass: Glass.lowball,
        link: "https://www.foodnetwork.com/recipes/ponche-creme-recipe-2106355"
    }
];

export default COCKTAILS;
