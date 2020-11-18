import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerPage } from '../pages/customer/customer';
import { CustomerDataPage } from '../pages/customer-data/customer-data';
import { CustomerDeliveryPage } from '../pages/customer-delivery/customer-delivery';
import { CustomerPropertiesPage } from '../pages/customer-properties/customer-properties';
import { TabsPage } from '../pages/tabs/tabs';
import { BasketPage } from '../pages/basket/basket';
import { ContactPage} from '../pages/contact/contact';
import { ModalWindowPage } from '../pages/modal-window/modal-window';
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from '@ionic/storage';
;
import { CustomHeaderComponent } from '../components/custom-header/custom-header'; 

@NgModule({
  declarations: [
    MyApp, 
    HomePage,
    CustomerPage,
    CustomerDataPage,
    CustomerDeliveryPage,
    CustomerPropertiesPage,
    ModalWindowPage,
    CustomHeaderComponent,
    TabsPage,
    ContactPage,
    BasketPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerPage,
    CustomerDataPage,
    CustomerDeliveryPage,
    CustomerPropertiesPage,
    ModalWindowPage,
    HomePage,
    BasketPage,
    ContactPage,    
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
