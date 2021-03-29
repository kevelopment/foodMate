import { Ingredient } from "@models";

export default class UsedIngredient {
  constructor(
    public ingredient: Ingredient,
    public quantity: number,
    public unit: string
  ) {}
}

/**
 * Recipe:
 * UsedIngredient[] = [
 * {ingredientA, 1, tablespoon},
 * {ingredientB, 2, piece(s)},
 * {ingredientC, 500, gram},
 * ]
 */
