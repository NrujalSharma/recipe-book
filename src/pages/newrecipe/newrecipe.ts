import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from "../../services/recipes.service";
import { Recipe} from "../../models/recipe.model";

@IonicPage()
@Component({
  selector: 'page-newrecipe',
  templateUrl: 'newrecipe.html',
})
export class NewrecipePage implements OnInit{
  mode = 'New';
  selectOptions = ['Easy','Medium','Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(public navParams: NavParams,
              public actionSheetController: ActionSheetController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public recipesService: RecipesService,
              public navCtrl: NavController) {}

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  private initializeForm(){
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit(){
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }

    if(this.mode == 'Edit'){
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients)
    }
    else{
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons:[
        {
          text: 'Add Ingerdient',
          handler: () => {
              this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for(let i = len - 1; i>=0; i--){
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'Removed all ingredients successfully.',
                duration: 2000,
                position: 'middle'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert(){
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs:[
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Added Successfully!',
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }
        }
      ]
    });
  }
}
