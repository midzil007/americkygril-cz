var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
/**
 * Generated class for the AddItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddItemPage = (function () {
    function AddItemPage(http, loadingCtrl) {
        // this.initializeItems(); <- you don't need this anymore
        var _this = this;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        // Show the loading message
        var loadingPopup = this.loadingCtrl.create({
            content: 'Loading posts...'
        });
        this.http.get('https://www.shop-jura.cz/?getproducts=1&onlykavovars=1').map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.posts = data.products;
            _this.initializeItems();
            // Hide the loading message
            loadingPopup.dismiss();
        });
    }
    AddItemPage.prototype.initializeItems = function () {
        this.items = this.posts;
    };
    AddItemPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    return AddItemPage;
}());
AddItemPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-add-item',
        templateUrl: 'add-item.html',
    }),
    __metadata("design:paramtypes", [Http, LoadingController])
], AddItemPage);
export { AddItemPage };
//# sourceMappingURL=add-item.js.map