import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxElectronModule } from 'ngx-electron';
import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { NgxPrintModule } from 'ngx-print';
import { ThermalPrintModule } from 'ng-thermal-print';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, 
    NgxElectronModule,
    NgxPrintModule, 
    SocketIoModule.forRoot(config),
    ThermalPrintModule],
    providers: [Printer, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
  })
export class AppModule { }
