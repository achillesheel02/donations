import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {Menu20Module} from '@carbon/icons-angular/lib/menu/20';
import {Close20Module} from '@carbon/icons-angular/lib/close/20';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Menu20Module,
    Close20Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
