import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {NgxDateTimePickerComponent} from "../modules/ngx-datetime-picker/ngx-datetime-picker.component";
import {NgxNumericDateTimePickerComponent} from "../modules/ngx-numeric-datetime-picker/ngx-numeric-datetime-picker.component";
import {NgxDaySelectorComponent} from "../modules/ngx-datetime-picker/components/ngx-day-selector.component";
import {NgxMonthSelectorComponent} from "../modules/ngx-datetime-picker/components/ngx-month-selector.component";
import {NgxYearSelectorComponent} from "../modules/ngx-datetime-picker/components/ngx-year-selector.component";
import {NgxTimeSelectorComponent} from "../modules/ngx-datetime-picker/components/ngx-time-selector.component";

@NgModule({
  declarations: [
    AppComponent,
    NgxDateTimePickerComponent,
    NgxNumericDateTimePickerComponent,
    NgxDaySelectorComponent,
    NgxMonthSelectorComponent,
    NgxYearSelectorComponent,
    NgxTimeSelectorComponent
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
