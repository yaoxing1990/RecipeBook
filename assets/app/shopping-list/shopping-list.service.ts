import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import {OnInit} from '@angular/core';
import {isUndefined} from 'util';

export class ShoppingListService {

  totalPrice: number = 0;

  priceMap = {
    "Apples": 1,
    "Tomatoes": 2,
      "Meat": 10,
      "French Fries": 0.2,
      "Buns": 0.5,
      "Olive oil": 2,
      "Egg": 1
  };

  ingre  = new Map<String, number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];



  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // for(var i = 0; i < this.ingredients.length; i++) {
    //   for(var j = 0; j < this.ingredients.length; j++) {
    //     if(i < j && this.ingredients[i].name == this.ingredients[j].name) {
    //       console.log(i + " " + j);
    //       this.ingredients[i].amount += this.ingredients[j].amount;
    //       this.ingredients.splice(j, 1);
    //     }
    //   }
    // }
      for(var i = 0; i < ingredients.length; i++) {
        if(!this.ingre.has(ingredients[i].name)) this.ingre.set(ingredients[i].name, ingredients[i].amount);
        else this.ingre.set(ingredients[i].name, this.ingre.get(ingredients[i].name) + ingredients[i].amount);
      }

      this.ingredients = [];

      var itr = this.ingre.entries();
      var i = this.ingre.size;


      while(i > 0) {
          var pair = itr.next().value;
          this.ingredients.push(new Ingredient(pair[0].toString(), pair[1]));
          i--;
      }



    this.ingredientsChanged.next(this.ingredients.slice());
  }



  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  checkout() {
    this.totalPrice = 0;
      for(var i = 0; i < this.ingredients.length; i++) {
        console.log(this.priceMap[this.ingredients[i].name]);
          console.log(this.ingredients[i].amount);
        this.totalPrice += (this.priceMap[this.ingredients[i].name]) * (this.ingredients[i].amount);
      }
      console.log(this.totalPrice);
  }
}
