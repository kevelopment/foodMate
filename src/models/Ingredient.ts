interface IngredientType {
  id?: string;
  name: string;
  imageUrl: string;
}
export default class Ingredient {
  id: string;
  name: string;
  imageUrl: string;
  constructor({ id, name, imageUrl }: IngredientType) {
    this.id = id ?? "";
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
