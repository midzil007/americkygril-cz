import { Component } from '@angular/core';

/**
 * Generated class for the CustomHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.html'
})
export class CustomHeaderComponent {

  constructor() {
  }

  showPage(site : string) : void 
  {  
  	switch (site) {
  		case "CustomerPage":
  		//	this.navCtrl.setRoot(CustomerPage);
  		break; 
  		case "ContactPage":
  		//	this.navCtrl.setRoot(ContactPage);
  		break;
  		case "MachineListPage":
  		//	this.navCtrl.setRoot(MachineListPage);
  		break;
  		case "AddItemPage": 
  		//	this.navCtrl.setRoot(AddItemPage); 
  		break;
  	}
  }

}
