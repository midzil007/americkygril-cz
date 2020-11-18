import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMachinesPage } from './list-machines';

@NgModule({
  declarations: [
    ListMachinesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMachinesPage),
  ],
  exports: [
    ListMachinesPage
  ]
})
export class ListMachinesPageModule {}
