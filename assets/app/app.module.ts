import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';






import { AppRoutingModule } from './app-routing.module';


import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {ErrorComponent} from './errors/error.component';
import {ErrorService} from './errors/error.service';
import {AuthService} from './auth/auth.service';
import {ActivatedRouteSnapshot} from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
     ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  providers: [AuthService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
