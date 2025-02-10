import { mealData } from "./Contracts/meal-data";

interface IngredientsData {
    [key: string]: string;
}

export class MealDetails{
    id: number;
    name: string;
    category: string;
    area: string;
    drinkAlternate: string | null;
    instructions: string;
    thumbnailUrl: string;
    tags: string;
    youtubeUrl: string;
    ingredientDict: IngredientsData;
    source: string;
    imgSource: string | null;

    
    public constructor(data: mealData){
        this.id = Number(data.idMeal);
        this.name = data.strMeal;
        this.category = data.strCategory;
        this.area = data.strArea;
        this.drinkAlternate = data.strDrinkAlternate;
        this.instructions = data.strInstructions;
        this.thumbnailUrl = data.strMealThumb;
        this.tags = data.strTags;
        this.youtubeUrl = data.strYoutube;
        this.source = data.strSource;
        this.imgSource = data.strImageSource;
        this.ingredientDict = this.ParseIngredientsData(data);
    }

    private ParseIngredientsData = (data: mealData): IngredientsData => {
        const dict: IngredientsData = {};

        for (let i = 1; i <= 20; i++) {
            const ingredient = data[`strIngredient${i}` as keyof mealData];
            const measure = data[`strMeasure${i}` as keyof mealData];

            if (ingredient && ingredient.trim() !== "") {
                dict[ingredient] = measure ? measure.trim() : ""; // Store ingredient with its measure
            }
        }

        return dict;    }
}