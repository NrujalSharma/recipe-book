import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ingredient } from "../../models/ingredient.model";
import { Recipe } from "../../models/recipe.model";
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { RecipesService } from '../../services/recipes.service';
@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public slService: ShoppinglistService,
              public recipesService: RecipesService) {}

  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe(){
    this.navCtrl.push('NewrecipePage', {mode: "Edit", recipe: this.recipe, index: this.index});
  }

  onAddIngredients(){
    this.slService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
