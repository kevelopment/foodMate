import { Ingredient } from ".";
import UsedIngredient from "./UsedIngredient";
interface RecipeType {
  title: string;
  imageUrl: string;
  timeInMinutes: number;
  difficulty: number;
  ingredients: Ingredient[];
  id?: string;
  tags?: string[];
  description?: string;
  subtitle?: string;
  isFavourite?: boolean;
}

export default class Recipe {
  id: string;
  title: string;
  imageUrl: string;
  timeInMinutes: number;
  difficulty: number;
  ingredients: UsedIngredient[];
  description: string;
  subtitle: string;
  isFavourite: boolean;
  tags: string[];
  /**
   * Creates an instance of Recipe.
   * @param {string} title
   * @param {string} imageUrl
   * @param {number} timeInMinutes
   * @param {string} [id]
   * @param {string} [description]
   * @param {string} [subtitle]
   * @param {boolean} [isFavourite]
   * @memberof Recipe
   */
  constructor({
    title,
    imageUrl,
    timeInMinutes,
    difficulty,
    ingredients,
    tags,
    id,
    description,
    subtitle,
    isFavourite,
  }: RecipeType) {
    this.id = id ?? "";
    this.title = title;
    this.imageUrl = imageUrl;
    this.timeInMinutes = timeInMinutes;
    this.difficulty = difficulty;
    this.ingredients = ingredients ?? [];
    this.tags = tags ?? [];
    this.description = description ?? "";
    this.subtitle = subtitle ?? "";
    this.isFavourite = isFavourite ?? false;
  }
}
