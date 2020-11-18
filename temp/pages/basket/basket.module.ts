import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasketPage } from './basket';

@NgModule({
  declarations: [
    BasketPage,
  ],
  imports: [
    IonicPageModule.forChild(BasketPage),
  ],
  exports: [
    BasketPage
  ]
})
export class BasketPageModule {}
