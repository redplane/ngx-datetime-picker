/**
 * Created by Linh Nguyen on 6/1/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {NgxDateTimePickerOption} from "./ngx-datetime-picker-option";
import * as _ from 'lodash';
import {CalendarSelectionMode} from "./enumerations/calendar-selection-mode";
import {Range} from "./models/Range";

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
  private datesMatrix: Array<Array<Date>>;

  // Year matrix which is used for drawing years in calendar.
  private yearsMatrix: Array<Array<number>>;

  // Matrix of months which can be shown on calendar.
  private monthsMatrix: Array<Array<number>>;

  // Range of years.
  private yearRange: Range<number>;

  // Calendar selection mode
  private calendarSelectionMode: CalendarSelectionMode;

  // Enumeration reflection.
  private CalendarSelectionMode = CalendarSelectionMode;

  /*
   * Current time of the system.
   * */
  private currentTime: Date;

  //#endregion

  //#region Constructor

  // Initiate constructor with default settings.
  public constructor() {
    this.options = new NgxDateTimePickerOption();
    this.datesMatrix = new Array<Array<Date>>();
    this.yearsMatrix = new Array<Array<number>>();
    this.monthsMatrix = new Array<Array<number>>();

    this.calendarSelectionMode = CalendarSelectionMode.year;
    this.currentTime = new Date();

    this.yearRange = new Range<number>();
  }

  //#endregion

  //#region Methods

  // This event is called when component has been initiated successfully.
  public ngOnInit(): void {

    // Calculate year range.
    let iYear = this.currentTime.getFullYear();
    this.yearRange.from = iYear;
    this.yearRange.to = iYear + this.options.yearSelectionRange;

    // Calculate month matrix.
    let iMonth = 1;
    let iMonthRowIndex = 0;
    while (iMonth < 13){

      if (this.monthsMatrix[iMonthRowIndex] == null)
        this.monthsMatrix[iMonthRowIndex] = new Array<number>();

      this.monthsMatrix[iMonthRowIndex].push(iMonth);

      if (iMonth % 3 == 0)
        iMonthRowIndex++;

      iMonth++;
    }

    // Calculate initial date.
    if (this.options != null && this.options.initial != null)
      this.updateDate(_.cloneDeep(this.options.initial));
    else
      this.updateDate(new Date());

    // Set current date to first day of month.
    this.date.setDate(this.getMonthFirstDay());
  }

  // Get first day of month.
  private getMonthFirstDay(): number {
    return 1;
  }

  /*
   * Get max days of a month.
   * */
  private getMaxDays(year: number, month: number): number {
    return (new Date(year, month + 1, 0)).getDate();
  }

  /*
   * Set value to component date.
   * */
  public updateDate(date: Date) {
    this.date = date;

    switch (this.calendarSelectionMode) {
      case CalendarSelectionMode.year:
        this.yearsMatrix = this.getYearsMatrix(this.yearRange, this.options.yearsPerRow);
        this.datesMatrix = null;
        break;

      default:
        // Get list of dates which can be shown upon calendar.
        this.datesMatrix = this.getDatesMatrix(this.date);
        this.yearsMatrix = null;
        break;

    }
    this.datesMatrix = this.getDatesMatrix(this.date);
  }

  /*
   * Get datesMatrix of date which should be shown upon calendar in date selection mode.
   * */
  private getDatesMatrix(input: Date): Array<Array<Date>> {

    // Get date datesMatrix.
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

    for (let iDay = 1 - iWeekDay; iDay <= iMaxDay; iDay++) {

      if (matrix[iWeek] == null)
        matrix[iWeek] = [];

      if (iDay < 1) {
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

    return matrix;
  }

  /*
   * Get years list.
   * */
  private getYearsMatrix(range: Range<number>, split: number): Array<Array<number>> {
    let years: Array<Array<number>> = new Array<Array<number>>();
    let iRow = 0;
    let iColumn = 0;
    let i = range.from;
    while (i < range.to) {
      if (years[iRow] == null)
        years[iRow] = [];

      years[iRow].push(i);
      i++;
      iColumn++;

      if (iColumn % split == 0) {
        iColumn = 0;
        iRow++;
      }
    }

    return years;
  }

  /*
   * Check whether the date is today or not.
   * */
  private getToday(date: Date): boolean {

    // Date is not valid.
    if (date == null)
      return false;

    return (date.getFullYear() == this.currentTime.getFullYear() && date.getMonth() == this.currentTime.getMonth() && date.getDate() == this.currentTime.getDate());
  }

  /**
   * Update month to calendar.
   * @param month
   */
  private updateMonth(month: number) {
    let iMonth = this.date.getMonth();
    iMonth += month;
    let date = _.cloneDeep(this.date);
    date.setMonth(iMonth);

    this.updateDate(date);
  }

  /*
   * Get current year in system.
   * */
  private getCurrentYear(): number {
    return this.currentTime.getFullYear();
  }

  /*
   * Make a year be selected.
   * */
  private selectYear(year: number): void {

    // Set year.
    this.date.setFullYear(year);

    // Let user select day.
    this.calendarSelectionMode = CalendarSelectionMode.month;

    this.updateDate(this.date);
  }

  /*
  * Select month and jump to date select if possible.
  * */
  private selectMonth(month: number): void{
    this.date.setMonth(month);
    this.calendarSelectionMode = CalendarSelectionMode.day;
    this.updateDate(this.date);
  }
  /*
  * Update year range.
  * */
  private updateYearRange(start: number, end: number): void{

    if (start > end){
      let iTemporary = start;
      start = end;
      end = iTemporary;
    }

    this.yearRange.from = start;
    this.yearRange.to = end;
    this.yearsMatrix = this.getYearsMatrix(this.yearRange, this.options.yearsPerRow);
  }

  /*
  * This callback is fired when title of calendar is clicked.
  * */
  private clickTitle(): void{
    switch (this.calendarSelectionMode){
      case CalendarSelectionMode.day:
        this.calendarSelectionMode = CalendarSelectionMode.month;
        break;

      case CalendarSelectionMode.month:
        this.calendarSelectionMode = CalendarSelectionMode.year;
        break;
    }

    this.updateDate(this.date);
  }

  /*
  * Check whether month is the current selected or not.
  * */
  private isCurrentMonth(month: number): boolean{

    // Year is different.
    if (this.date.getFullYear() != this.currentTime.getFullYear())
      return false;

    if (this.currentTime.getMonth() != month)
      return false;

    return true;
  }
  //#endregion
}
