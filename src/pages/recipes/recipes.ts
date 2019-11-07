import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewrecipePage } from '../newrecipe/newrecipe';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from "../../services/recipes.service";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(public navCtrl: NavController, public recipesService: RecipesService) {}

  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(){
    this.navCtrl.push('NewrecipePage', {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number){
    this.navCtrl.push('RecipePage', {recipe: recipe, index: index});
  }
}
