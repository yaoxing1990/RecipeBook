import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public recipeId?: string;
  public userId?: string;

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[], recipeId?: string, userId?: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.recipeId = recipeId;
    this.userId = userId;
  }
}
