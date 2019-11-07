import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewrecipePage } from './newrecipe';

@NgModule({
  declarations: [
    NewrecipePage,
  ],
  imports: [
    IonicPageModule.forChild(NewrecipePage),
  ],
})
export class NewrecipePageModule {}
