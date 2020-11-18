import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
/**
 * Generated class for the CustomFooterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'custom-footer',
  templateUrl: 'custom-footer.html' 
})
export class CustomFooterComponent {

  constructor(public navCtrl: NavController) {
   
  }

  showPage(site)
  {
  	this.navCtrl.setRoot(site);
  } 

}
