import {Component, Input, ViewChild} from '@angular/core';
import {NgxNumericDateTimePickerOption} from "../modules/ngx-numeric-datetime-picker/ngx-numeric-datetime-picker-option";
import {NgxBootstrapDateTimePickerComponent} from "modules/ngx-bootstrap-datetime-picker/ngx-bootstrap-datetime-picker.component";
import {NgxNumericDateTimePickerComponent} from "../modules/ngx-numeric-datetime-picker/ngx-numeric-datetime-picker.component";
import {NgxDateTimePickerOption} from "modules/ngx-bootstrap-datetime-picker/ngx-bootstrap-datetime-picker-option";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  //#region Properties

  @ViewChild('ngxDateTimePicker')
  private ngxDateTimePicker: NgxBootstrapDateTimePickerComponent;

  @ViewChild('ngxNumericDateTimePicker')
  private ngxNumericDateTimePicker: NgxNumericDateTimePickerComponent;

  private options: NgxDateTimePickerOption;
  //#endregion

  private ngxNumericDateTimePickerOption: NgxNumericDateTimePickerOption;

  public constructor(){
    this.ngxNumericDateTimePickerOption = new NgxNumericDateTimePickerOption();
    this.ngxNumericDateTimePickerOption.bTimePickerSupport = true;
    let initialDate = new Date();
    initialDate.setFullYear(1000);
    this.ngxNumericDateTimePickerOption.initial = initialDate;

  }
  title = 'app works!';

  //#region Methods

  public getDate(date: Date): void{

    console.log(date);
  }

  public clearSelection(): void{
    this.ngxDateTimePicker.clearSelection();
  }

  public setToday(): void{
    let date: Date = new Date();
    this.ngxDateTimePicker.setSelection(date);
  }

  public clearNumericSelection(): void{
    this.ngxNumericDateTimePicker.clearSelection();
  }
  //#endregion
}
