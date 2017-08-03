import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../errors/error.service';

@Injectable()
export class DataStorageService {
    private recipes: Recipe[] = [];
    index: number;
  constructor(private http: Http, 
              private recipeService: RecipeService,
              private errorService: ErrorService) {}

  storeRecipes() {
      const body = JSON.stringify(this.recipeService.getRecipe(this.index));
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('http://angular2deployment-env.rryzmkhw72.us-east-2.elasticbeanstalk.com/recipe' + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
              const recipe =  new Recipe(
                  result.obj.name,
                  result.obj.description,
                  result.obj.imagePath,
                  result.obj.ingredients,
                  result.obj._id,
                  result.obj.user._id);
              this.recipeService.getRecipes().push(recipe);
              return recipe;
          })
          .catch((error: Response) => {
                  this.errorService.handleError(error.json());
                  return Observable.throw(error.json());
              }
          );


    // const token = this.authService.getToken();
    // return this.http.put('https://ng-recipe-book-4eaf8.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
      return this.http.get('http://angular2deployment-env.rryzmkhw72.us-east-2.elasticbeanstalk.com/recipe')
          .map((response: Response) => {
              const recipes = response.json().obj;
              let transformedRecipes: Recipe[] = [];
              for(let recipe of recipes) {
                  transformedRecipes.push(new Recipe(
                      recipe.name,
                      recipe.description,
                      recipe.imagePath,
                      recipe.ingredients,
                      recipe._id,
                      recipe.user._id));
              }
              this.recipes = transformedRecipes;
              return transformedRecipes;
          })
          .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
          })
          .subscribe(
              (recipes: Recipe[]) => {
                  this.recipeService.setRecipes(recipes);
              }
          );

    // const token = this.authService.getToken();
    //
    // this.http.get('https://ng-recipe-book-4eaf8.firebaseio.com/recipes.json?auth=' + token)
    //   .map(
    //     (response: Response) => {
    //       const recipes: Recipe[] = response.json();
    //       for (let recipe of recipes) {
    //         if (!recipe['ingredients']) {
    //           recipe['ingredients'] = [];
    //         }
    //       }
    //       return recipes;
    //     }
    //   )
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipeService.setRecipes(recipes);
    //     }
    //   );
  }
}
