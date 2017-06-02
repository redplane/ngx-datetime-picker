import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {NgxDateTimePickerComponent} from "../modules/ngx-datetime-picker/ngx-datetime-picker.component";
import {NgxNumericDateTimePickerComponent} from "../modules/ngx-numeric-datetime-picker/ngx-numeric-datetime-picker.component";

@NgModule({
  declarations: [
    AppComponent,
    NgxDateTimePickerComponent,
    NgxNumericDateTimePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
