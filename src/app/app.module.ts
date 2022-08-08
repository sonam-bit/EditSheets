import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports:      [ BrowserModule, SpreadsheetAllModule ,  FormsModule,  AppRoutingModule],
  declarations: [ AppComponent ],
  providers: [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }