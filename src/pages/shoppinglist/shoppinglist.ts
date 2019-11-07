import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppinglistService } from "../../services/shoppinglist.service";
import { Ingredient } from "../../models/ingredient.model";

@IonicPage()
@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppinglistService) {
  }

  onAddItem(form: NgForm){
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  ionViewWillEnter(){
    this.loadItems();
  }

  private loadItems(){
    this.listItems = this.slService.getItems();
  }

  onRemoveItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();
  }
}
