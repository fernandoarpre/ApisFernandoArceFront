import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Helpers
import { TokenInterceptor } from './utils/token.interceptor';
import { ErrorHandler } from './utils/error.handler'

//Componensts
import { LoginComponent } from '../app/components/login/login.component';
import { CustomerComponent } from '../app/components/customer/customer.component';
import { SalesComponent } from './components/sales/sales.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';

//Notifier
import { NotifierModule } from "angular-notifier";

//Mask
import { NgxMaskModule, IConfig } from 'ngx-mask'
//Charts
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    SalesComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {position: "right",distance: 12},
        vertical: {position: "top",distance: 12,gap: 10}
      },
      behaviour: {autoHide: 5000,onClick: false,onMouseover: "pauseAutoHide",showDismissButton: true,stacking: 4
      },
    }),
    NgxMaskModule.forRoot(),
    HighchartsChartModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandler, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
