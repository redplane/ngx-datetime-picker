/**
 * Created by Akai on 6/17/2017.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxBootstrapDateTimePickerComponent} from "./ngx-bootstrap-datetime-picker.component";
import {NgxTimeSelectorComponent} from "./components/ngx-time-selector.component";
import {NgxYearSelectorComponent} from "./components/ngx-year-selector.component";
import {NgxMonthSelectorComponent} from "./components/ngx-month-selector.component";
import {NgxDaySelectorComponent} from "./components/ngx-day-selector.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgxBootstrapDateTimePickerComponent,
    NgxTimeSelectorComponent,
    NgxDaySelectorComponent,
    NgxMonthSelectorComponent,
    NgxYearSelectorComponent],
  exports:[
    NgxBootstrapDateTimePickerComponent
  ]
})

export class NgxBootstrapDateTimePickerModule{

}
