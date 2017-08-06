import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private storage: DataStorageService) { }

  ngOnInit() {
    this.storage.getRecipes();
  }

}
