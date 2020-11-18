import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AddItemPage } from '../../pages/add-item/add-item';
import { MachineListPage } from '../../pages/machine-list/machine-list';
import { ContactPage } from '../../pages/contact/contact';
import { CustomerPage} from '../../pages/customer/customer';
import { Data } from '../../providers/data';


@Component({
  selector: 'custom-footer',
  templateUrl: 'custom-footer.html' 
})
export class CustomFooterComponent {

  public show: boolean = false;

  constructor(public navCtrl: NavController, public dataService: Data) {
      this.dataService.getMachinesList().then((machinelist) => {
      if(machinelist){     
          this.show = true;   
      } 
    });
  }
 
  showPage(site) 
  {  
  	switch (site) {
  		case "CustomerPage":
  			this.navCtrl.setRoot(CustomerPage);
  		break; 
  		case "ContactPage":
  			this.navCtrl.setRoot(ContactPage);
  		break;
  		case "MachineListPage":
  			this.navCtrl.setRoot(MachineListPage);
  		break;
  		case "AddItemPage":
  			this.navCtrl.setRoot(AddItemPage);
  		break;
  	}
  }
}
