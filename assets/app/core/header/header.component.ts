import {Component, Input} from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Router} from '@angular/router';
import {RecipeService} from '../../recipes/recipe.service';
import {Recipe} from '../../recipes/recipe.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isNew: boolean = true;
  recipes: Recipe[] = [];

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService,
              private recipeService: RecipeService,
              private router: Router) {}


  onSaveData() {
    this.recipes = this.recipeService.getRecipes();
    for(let recipe of this.recipes) {
      if(recipe.name == this.recipeService.getRecipe(this.dataStorageService.index).name) {
          if(recipe.username == this.recipeService.getRecipe(this.dataStorageService.index).username) {
              if(!this.recipeService.editMode) {
                  this.isNew = true;
                  break;
              } else {
                  this.isNew = false;
              }
          }
      }
    }
    if(this.isNew) {
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    } else {
        console.log("Updated");
        this.dataStorageService.updateRecipes()
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

  }

  onDeleteData() {
      this.dataStorageService.deleteRecipes();
      this.recipes.splice(this.dataStorageService.index, 1);
      this.router.navigateByUrl('/');
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
