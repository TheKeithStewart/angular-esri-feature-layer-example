import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularEsriModule } from 'angular-esri-components';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularEsriModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
