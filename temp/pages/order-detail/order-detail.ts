import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { OrdersPage} from '../orders/orders'

/**
 * Generated class for the OrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export interface OrderItem {
  title: string;
  price: number;    
  dph: number;
  count: number; 
  image: string
}

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
	order : any; 
	orderItems: Array<OrderItem>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http : Http) {
  	if(this.navParams.get('order'))
  	{
  		this.order = this.navParams.get('order');
  		this.http.get('https://www.shop-jura.cz/?getorders=1&detail='+this.order.id).map(res => res.json()).subscribe(data => {
  			this.orderItems = data.orders;
    	});
  	};
  }
   backTo(): void
  {
  	this.navCtrl.push(OrdersPage);   
  }	
}
