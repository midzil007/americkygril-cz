var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item/add-item';
import { DetailItemPage } from '../pages/detail-item/detail-item';
import { MachineListPage } from '../pages/machine-list/machine-list';
import { ModalWindowPage } from '../pages/modal-window/modal-window';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { CustomerPage } from '../pages/customer/customer';
import { Data } from '../providers/data';
import { DataCustomerProvider } from '../providers/data-customer/data-customer';
import { HttpModule } from '@angular/http';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            LoginPage,
            AddItemPage,
            CustomerPage,
            ModalWindowPage,
            MachineListPage,
            DetailItemPage
        ],
        imports: [
            HttpModule,
            BrowserModule,
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot()
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            CustomerPage,
            LoginPage,
            ModalWindowPage,
            AddItemPage,
            MachineListPage,
            DetailItemPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            Data,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            DataCustomerProvider,
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map