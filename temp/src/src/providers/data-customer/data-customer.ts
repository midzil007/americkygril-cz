import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataCustomerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataCustomerProvider {


  constructor(public storage: Storage) {
  }

  getData() { 
     return this.storage.get('userdata');  
  }    
 
  save(lastdata){
    let newData = JSON.stringify(lastdata);
    this.storage.set('userdata', newData);  
  }  

}
