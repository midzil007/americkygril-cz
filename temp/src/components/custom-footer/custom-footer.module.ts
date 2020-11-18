import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomFooterComponent } from './custom-footer';

@NgModule({
  declarations: [
    CustomFooterComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomFooterComponent),
  ],
  exports: [
    CustomFooterComponent
  ]
})
export class CustomFooterComponentModule {}
