import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions } from '@angular/http';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

 export interface Product
{
	id: number,
	title: string,
	url: string,
	image: string,
	desc: string,
	price: number,
  dph: number,
  isTopOffer: boolean
};

export interface BasketItem
{
  id: number,
  count: number,
  price: number,
  title: string,
  dph: number
}

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  private listProducts : Array<Array<Product>>;
  private listProducts2 : Array<Array<Product>>;
  private listBasketItems = []; 
  private saveListBasketItems = [];
  countItems : number;
  total : number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage,private http: Http, private dataService: DataProvider) {
  	this.listProducts = []; 
    this.listProducts2 = []; 
    this.listBasketItems = [];
    this.saveListBasketItems = [];
    this.total = 0;
    this.countItems = 0;
    this.dataService.getOptions("listBasketItems").then((listBasketItems) => {
      if(listBasketItems){   
         this.saveListBasketItems = listBasketItems; 
      }  
    });
    this.http.get('https://www.shop-jura.cz/?getproducts=1').map(res => res.json()).subscribe(data => {
	    this.listProducts = this.initProducts(data.products);
    });
    this.http.get('https://www.shop-jura.cz/?getproducts=1').map(res => res.json()).subscribe(data => {
      this.listProducts2 = this.initProducts(data.products);
    });
    
  } 



 initProducts(data: any) : Array<Array<Product>>
  {  
   
    let list : Array<Array<Product>> = [];
     let rowNum : number  = 0;
     let item :  any;
     let ii : number = 0;
     for (let i = 0; i < data.length; i+=2) { //iterate images

      list[rowNum] = Array(2); //declare two elements per row
        if (data[i]) { //check file URI exists
          item = data[i];
          list[rowNum][0] = <Product>{
              id: item.id,
              title: item.title, 
              url: item.path,
              price: item.price,    
              desc: item.html,
              image: item.photo,
              dph : item.dph,
              isTopOffer : item.topOffer
            }
             this.iniBasketItem(item);
        }
        if (data[i+1]) { //repeat for the second image
          item = data[i+1];
          list[rowNum][1] = <Product>{
              id: item.id,
              title: item.title, 
              url: item.path,
              price: item.price,    
              desc: item.html, 
              image: item.photo,
              dph : item.dph,
              isTopOffer : item.topOffer
            }
            this.iniBasketItem(item);
        }
      
        rowNum++; //go on to the next row   
      }       
       return list;
  }

  setBasketItem(item : any, count : number, mark : string) : void
  {
    let temp =  [];  
  	let dataItem = <BasketItem>{
         id: item.id,  
         price: item.price,     
         count:  count,  
         title: item.title,
         dph: item.dph
       };
    let tempItem :any; 
    this.total = 0;
    this.countItems = 0;
    for (var saveItem of this.listBasketItems) {
         if(saveItem.id == item.id){
             if(mark == '+')
             {
               dataItem.count = saveItem.count + 1;  
             }
             else{
               dataItem.count = saveItem.count - 1;   

             }
             this.getGoupInfoBasket(dataItem);
             temp.push(dataItem);
         } 
         else{
            temp.push(saveItem); 
            this.getGoupInfoBasket(saveItem);
         }
    }
   
    this.listBasketItems = temp; 
    this.dataService.saveOptions(this.listBasketItems, "listBasketItems");
  }

  getGoupInfoBasket(item : BasketItem) : void
  {
    this.total += (item.count * item.price); 
    this.countItems += item.count;
  }

  showCountItem(itemId : Number) : Number
  {

   for (var item of this.listBasketItems) {
      if(item.id == itemId)
      { 
        return item.count;
      }
    }
    return 0; 
  } 

   iniBasketItem(item : Product) : void
  {      
    let dataItem = <BasketItem>{
         id: item.id,  
         price: item.price,     
         count:  0,  
         title: item.title,
         dph: item.dph
       };
     
       let temp = [];
       let isIn  : Boolean = false;
       for (var saveItem of this.saveListBasketItems)
       {
         if(saveItem.id == dataItem.id)
         { 
            this.listBasketItems.push(saveItem);
            this.getGoupInfoBasket(saveItem);   
         }
         isIn = true; 
       }
       if(isIn == false) 
       {  
         this.listBasketItems.push(dataItem);
         this.getGoupInfoBasket(dataItem);
       }  
   }     
  

  //bacha na delivery atd
  sendOrders()
  { 
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let bsdy = {
      payment: 0,
      delivery: 0,
      data: this.listBasketItems
    };   

     let body = {
         message: 'test'
    };   
    this.dataService.getOptions("payment").then((payment) => {
      if(payment){   
         bsdy.payment = payment; 
      }})
    this.dataService.getOptions("delivery").then((delivery) => {
      if(delivery){        
         bsdy.delivery = delivery; 
      }})    
    this.http.post('https://www.shop-jura.cz/?requestIonicOrder=1', JSON.stringify(body), options)
    .map(res => res) 
    .subscribe(data => {
        console.log(data);
    }); 
  }
  sendOrder()
  {

       var link = 'https://www.shop-jura.cz/?requestIonicOrder=1';
        let bsdy = {
      payment: 0,
      delivery: 0,
      data: this.listBasketItems
    };   

   
    this.dataService.getOptions("payment").then((payment) => {
      if(payment){   
         bsdy.payment = payment; 
      }})
    this.dataService.getOptions("delivery").then((delivery) => {
      if(delivery){        
         bsdy.delivery = delivery; 
      }})       
         
        this.http.post(link, JSON.stringify(bsdy))
        .subscribe(data => {
        console.log("fdfdf");   
        
        }, error => {
            console.log("Oooops!");
        });
  }
}
