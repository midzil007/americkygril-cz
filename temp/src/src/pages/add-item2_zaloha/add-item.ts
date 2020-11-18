import { Component } from '@angular/core';
import { IonicPage, LoadingController  } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the AddItemPage page.
 * 
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

	private posts: any; // <- I've added the private keyword 
  private items: any; // <- items property is now of the same type as posts
  constructor(private http: Http, private loadingCtrl: LoadingController) {

    // this.initializeItems(); <- you don't need this anymore

    // Show the loading message
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading posts...'
    });

    this.http.get('https://www.shop-jura.cz/?getproducts=1&onlykavovars=1').map(res => res.json()).subscribe(data => {
        this.posts = data.products;
        this.initializeItems();

        // Hide the loading message
        loadingPopup.dismiss();
    });
  }

  initializeItems() {
    this.items = this.posts;
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })   
    }
  }


}
