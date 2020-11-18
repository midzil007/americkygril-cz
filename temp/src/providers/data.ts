import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
  

@Injectable()
export class Data {
 	items: any; 
  prislusenstvi: any;
 	islogin : boolean = false; 
  public machinelist =[];
  public basketlist =[];
  constructor(public storage: Storage, public http: Http){
  }

  dataInitItems(){
        this.http.get('https://www.shop-jura.cz/?getproducts=1&onlykavovars=1').map(res => res.json()).subscribe(data => {
        this.items = data.products;
    });
  }; 
     

   getData() { 
     return this.storage.get('userdata');  
  }    
 
  save(lastdata){
    let newData = JSON.stringify(lastdata);
    this.storage.set('userdata', newData);  
  }  
  
  getMachinesList() 
  {
   //
    return this.storage.get('machinelist'); 
  }
 
  getBasketList() 
  {  
     return this.storage.get('basketlist');  
  }

  initItemToBasket(machine_id,item,mark,basketList)
  {

    //this.storage.clear();  
     let key = machine_id+"_"+item.id;
     let object = basketList[key];
     let count: number = 0; 
     if (object == null || !parseInt(object.count)) {
        count = 1;  
     }
     else{ 
       if(mark == '+')
       {
         count = parseInt(object.count) + 1;   
       }
       else{
         count = parseInt(object.count) - 1;   
       }
        
     }
     let dataItem = { 
         id: item.id,  
         price: item.price,  
         count:  count,   
     };                 
      basketList[key] = dataItem;//(parseInt(basketList[item]) + 1);
     this.storage.set('basketlist', basketList);         
     return basketList;
  }
 
  saveToMachineList(item) 
  {
    // tady dosetovat přislušetvni z internetu
       //tady dodělat init z db count aby bylo nula
    let url = 'https://www.shop-jura.cz/?getproducts=1&prislusenstvi=1&nodeid='+item.id;
    //url =   'https://www.shop-jura.cz/?getproducts=1&onlykavovars=1';
    this.http.get(url).map(res => res.json()).
    subscribe(    
       result => {
      this.prislusenstvi=result.products;
      let machine = {
        id: item.id,
        title: item.title,
        machineprop: this.prislusenstvi
      };  
      // tady test jesli je to ok
      this.machinelist.push({key:item.id, value:machine});  
      this.storage.set('machinelist', this.machinelist); 
    })
    ;  
   
    //
    //console.log(this.machinelist);            
    // 
  }
}