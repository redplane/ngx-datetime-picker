/**
 * Created by Linh Nguyen on 6/1/2017.
 */
import {Meridiem} from "../ngx-numeric-datetime-picker/enumerations/ngx-datetime-picker-daytime";

export class NgxDate{

  //#region Properties

  // Year of date.
  public year: number;

  // Month.
  public month: number;

  // Day.
  public day: number;

  // Hour.
  public hour: number;

  // Minute.
  public minute: number;

  public second: number;

  //#endregion

  //#region Constructor

  /*
  * Initiate model with default settings.
  * */
  public constructor(){
    this.year = null;
    this.month = null;
    this.day = null;
    this.hour = null;
    this.minute = null;
  }

  //#endregion

  //#region Methods

  // Set date to model.
  public update(date: Date): void{
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();

    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

  // Get date bound to model.
  public getDate(): Date{

    if (this.year == null)
      return null;

    if (this.month == null)
      return null;

    if (this.day == null)
      return null;

    let date = new Date();
    let iMonth = this.month -1;

    date.setFullYear(this.year, iMonth, this.day);
    date.setHours(this.hour, this.minute, this.second, 0);
    return date;
  }

  /*
  * Get month.
  * */
  public getMonth(): number{
    return this.month;
  }

  /*
  * Set month.
  * */
  public setMonth(iMonth): void{
    if (iMonth < 1) {
      this.month = 1;
      return;
    }
    else if (iMonth > 12){
      this.month = 12;
      return;
    }

    this.month = iMonth;
  }

  /*
  * Get year.
  * */
  public getYear(): number{
    return this.year;
  }

  /*
  * Set year.
  * */
  public setYear(iYear: number): void{
    this.year = iYear;
  }

  /*
  * Get day.
  * */
  public getDay(): number{
    return this.day;
  }

  /*
  * Set day.
  * */
  public setDay(day: number): number{

    if (day < 1){
      this.day = 1;
      return;
    }

    let iMaxDay = this.getMaxDays(this.year, this.month);
    if (day > iMaxDay){
      this.day = iMaxDay;
    }

    this.day = day;
  }

  /*
   * Get max days of a month.
   * */
  private getMaxDays(year: number, month: number): number {
    return (new Date(year, month + 1, 0)).getDate();
  }

  /*
  * Compare 2 dates.
  * */
  public ngxCompare(date: NgxDate): number{
    let source: Date = new Date();
    source.setFullYear(this.year, this.month, this.day);
    source.setHours(this.hour, this.minute, 0, 0);

    let target: Date = new Date();
    target.setFullYear(date.getYear(), date.getMonth(), date.getDay());
    target.setHours(date.hour, date.minute, 0, 0);

    return source.getTime() - target.getTime();
  }

  /*
  * Compare 2 dates.
  * */
  public dateCompare(date: Date): number{
    let source: Date = new Date();
    source.setFullYear(this.year, this.month, this.day);
    source.setHours(this.hour, this.minute, 0, 0);

    return source.getTime() - date.getTime();
  }
  //#endregion
}
