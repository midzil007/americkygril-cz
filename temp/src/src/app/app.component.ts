import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddItemPage } from '../pages/add-item/add-item';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { MachineListPage } from '../pages/machine-list/machine-list';
import { Data} from '../providers/data';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  public lastData;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dataService: Data) {
    dataService.getData().then((userdata) => {
      if(userdata){
         dataService.getMachinesList().then((machinelist) => {
        if(machinelist){  
          console.log(machinelist);  
           this.rootPage = MachineListPage;// MachineListPage;  //AddItemPage // 
        } 
        else{ 
          this.rootPage = AddItemPage;
        }
        }); 
        
        }   
      else{
        this.rootPage = LoginPage; //LoginPage;   
      }
    });
  
    platform.ready().then(() => { 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

