/**
 * Created by Linh Nguyen on 6/1/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {NgxDateTimePickerOption} from "./ngx-datetime-picker-option";
import * as _ from 'lodash';

@Component({
  selector: 'ngx-datetime-picker',
  templateUrl: 'ngx-datetime-picker.component.html',
  styleUrls: ['ngx-datetime-picker.css']
})

export class NgxDateTimePickerComponent implements OnInit {

  //#region Constructor

  // Date time picker setting
  @Input('options')
  private options: NgxDateTimePickerOption;

  // Instance store date object.
  private date: Date;

  // Date matrix which is used for drawing calendar.
  private matrix: Array<Array<Date>>;

  //#endregion

  //#region Constructor

  // Initiate constructor with default settings.
  public constructor() {
    this.options = new NgxDateTimePickerOption();
    this.matrix = new Array<Array<Date>>();
  }

  //#endregion

  //#region Methods

  // This event is called when component has been initiated successfully.
  public ngOnInit(): void {

    // Calculate initial date.
    if (this.options != null && this.options.initial != null)
      this.setDate( _.cloneDeep(this.options.initial));
    else
      this.setDate(new Date());

    // Set current date to first day of month.
    this.date.setDate(this.getMonthFirstDay());
  }

  // Get first day of month.
  private getMonthFirstDay(): number {
    return 1;
  }

  // Get previous days of last month.
  private getPreviousMonthDays(year: number, month: number, range: number): Array<number> {

    // Get max days of month.
    let iMaxDay = this.getMaxDays(year, month);

    // Initiate list of days should be returned.
    let days: Array<number> = new Array<number>();

    for (let index = iMaxDay - range; index <= iMaxDay; index++){
      days.push(index);
    }

    return days;
  }

  // Get max days of a month.
  private getMaxDays(year: number, month: number): number {
    return (new Date(year, month + 1, 0)).getDate();
  }

  public setDate(date: Date){
    this.date = date;
    this.matrix = this.getDatesMatrix(this.date);
  }

  private getDatesMatrix(input: Date): Array<Array<Date>>{

    // Get date matrix.
    let date: Date = _.cloneDeep(input);
    date.setDate(1);

    // Matrix of calendar.
    let matrix: Array<Array<Date>> = new Array<Array<Date>>();

    // Start week.
    let iWeek = 0;

    // Calculate week day.
    let iWeekDay = date.getDay();

    // Maximum day of a month.
    let iMaxDay = this.getMaxDays(date.getFullYear(), date.getMonth());

    for (let iDay = 1 - iWeekDay; iDay <= iMaxDay; iDay++){

      if (matrix[iWeek] == null)
        matrix[iWeek] = [];

      if (iDay < 1){
        matrix[iWeek].push(null);
        continue;
      }

      // Copy date instance.
      let current = _.cloneDeep(date);

      // Update date.
      current.setDate(iDay);

      // Add date to list.
      matrix[iWeek].push(current);

      if (current.getDay() == 6)
        iWeek++;
    }

    console.log(matrix);
    return matrix;
  }

  // Get current date.
  private isCurrentDate(date: Date): boolean{

    // Date is not valid.
    if (date == null)
      return false;

    let current = new Date();
    return (date.getFullYear() == current.getFullYear() && date.getMonth() == current.getMonth() && date.getDate() == current.getDate());
  }

  // Update month to calendar.
  private updateMonth(month: number){
    let iMonth = this.date.getMonth();
    iMonth += month;
    let date = _.cloneDeep(this.date);
    date.setMonth(iMonth);

    this.setDate(date);
  }
  //#endregion
}
