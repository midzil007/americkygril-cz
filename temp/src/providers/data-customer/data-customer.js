var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DataCustomerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DataCustomerProvider = (function () {
    function DataCustomerProvider(storage) {
        this.storage = storage;
    }
    DataCustomerProvider.prototype.getData = function () {
        return this.storage.get('userdata');
    };
    DataCustomerProvider.prototype.save = function (lastdata) {
        var newData = JSON.stringify(lastdata);
        this.storage.set('userdata', newData);
    };
    return DataCustomerProvider;
}());
DataCustomerProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], DataCustomerProvider);
export { DataCustomerProvider };
//# sourceMappingURL=data-customer.js.map