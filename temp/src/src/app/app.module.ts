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
import { ModalWindowPage} from '../pages/modal-window/modal-window';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { CustomerPage } from '../pages/customer/customer';
import { Data } from '../providers/data';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from '../components/header/header';
import { CustomHeaderComponent } from '../components/custom-header/custom-header';
import { CustomFooterComponent } from '../components/custom-footer/custom-footer';


@NgModule({
  declarations: [ 
    MyApp,
    HomePage,
    LoginPage,
    AddItemPage,
    CustomerPage,
    ModalWindowPage,
    MachineListPage,
    DetailItemPage,
    HeaderComponent,
    CustomHeaderComponent,
    CustomFooterComponent

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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
