var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var Data = (function () {
    function Data(storage, http) {
        this.storage = storage;
        this.http = http;
        this.islogin = false;
        this.machinelist = [];
    }
    Data.prototype.dataInitItems = function () {
        var _this = this;
        this.http.get('https://www.shop-jura.cz/?getproducts=1&onlykavovars=1').map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.items = data.products;
        });
    };
    ;
    Data.prototype.getIPAddress = function () {
        var _this = this;
        console.log(new Promise(function (resolve) {
            _this.http.get('https://randomuser.me/api/')
                .subscribe(function (data) {
                resolve(data.json());
            });
        }));
    };
    Data.prototype.getData = function () {
        return this.storage.get('userdata');
    };
    Data.prototype.save = function (lastdata) {
        var newData = JSON.stringify(lastdata);
        this.storage.set('userdata', newData);
    };
    Data.prototype.getMachinesList = function () {
        //this.storage.clear(); 
        return this.storage.get('machinelist');
    };
    Data.prototype.getPrislusenstvi = function (selecteditem) {
        return this.http.get('https://www.reddit.com/r/worldnews/.json').map(function (res) { return res.json(); });
    };
    Data.prototype.saveToMachineList = function (item) {
        var res;
        res = this.getIPAddress();
        console.log(res);
        // tady dosetovat přislušetvni z internetu
        var machine = {
            id: item.id,
            title: item.title
        };
        this.machinelist.push({ key: item.id, value: machine });
        //console.log(this.machinelist);            
        this.storage.set('machinelist', this.machinelist);
    };
    Data.prototype.login = function (email) {
    };
    return Data;
}());
Data = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage, Http])
], Data);
export { Data };
//# sourceMappingURL=data.js.map