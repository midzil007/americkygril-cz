import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public lastData;

  constructor(public navCtrl: NavController, public dataService: Data) {
  		//this.navCtrl.push(LoginPage, {});
     


  	   
  }

  

}
