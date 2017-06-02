/**
 * Created by Linh Nguyen on 6/1/2017.
 */
import {NgxDateTimePickerDayTime} from "../enumerations/ngx-datetime-picker-daytime";

export class DateInput{

  //#region Properties

  public year: number;

  public month: number;

  public day: number;

  public hour: number;

  public minute: number;

  public dayTime: NgxDateTimePickerDayTime;

  //#endregion

  //#region Methods

  // Set date to model.
  public setDate(date: Date): void{
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();

    this.hour = date.getHours();
    this.minute = date.getMinutes();

    if (this.hour >= 12)
      this.dayTime = NgxDateTimePickerDayTime.pm;
    else
      this.dayTime = NgxDateTimePickerDayTime.am;
  }

  // Get date bound to model.
  public getDate(): Date{
    let date = new Date();

    let iMonth = this.month -1;
    date.setFullYear(this.year, iMonth, this.day);
    date.setHours(this.hour, this.minute);

    return date;
  }
  //#endregion
}
