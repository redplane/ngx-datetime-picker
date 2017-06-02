import { Component } from '@angular/core';
import {NgxNumericDateTimePickerOption} from "../modules/ngx-numeric-datetime-picker/ngx-numeric-datetime-picker-option";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private ngxNumericDateTimePickerOption: NgxNumericDateTimePickerOption;

  public constructor(){
    this.ngxNumericDateTimePickerOption = new NgxNumericDateTimePickerOption();
    this.ngxNumericDateTimePickerOption.bTimePickerSupport = true;

    let initialDate = new Date();
    initialDate.setFullYear(1000);
    this.ngxNumericDateTimePickerOption.initialDate = initialDate;
  }
  title = 'app works!';

  public getDate(date: Date): void{
    if (date == null)
      return;
  }
}
