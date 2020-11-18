import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomHeaderComponent } from './custom-header';

@NgModule({
  declarations: [
    CustomHeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(CustomHeaderComponent),
  ],
  exports: [
    CustomHeaderComponent
  ]
})
export class CustomHeaderComponentModule {}
