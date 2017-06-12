/**
 * Created by Linh Nguyen on 6/1/2017.
 */
import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild, Output} from "@angular/core";
import {NgxDateTimePickerOption} from "./ngx-datetime-picker-option";
import * as _ from 'lodash';
import {CalendarSelectionMode} from "./enumerations/calendar-selection-mode";
import {Range} from "./models/Range";
import {NgxDate} from "../models/ngx-date";
import {reduce} from "rxjs/operator/reduce";

import * as moment from 'moment';

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

  @ViewChild('dropDownControl')
  private dropDownControl: ElementRef;

  // Instance store date object.
  private date: NgxDate;

  // Instance which represent date selection.
  private selection: NgxDate;

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
  * This event is fired when time is selected.
  * */
  @Output('select-time')
  private selectTimeEventEmitter: EventEmitter<NgxDate>;

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
    this.date = new NgxDate();

    this.selectTimeEventEmitter = new EventEmitter<NgxDate>();
  }

  //#endregion

  //#region Methods

  // This event is called when component has been initiated successfully.
  public ngOnInit(): void {

    // Set default calendar selection mode.
    this.calendarSelectionMode = CalendarSelectionMode.year;

    // Get current system time.
    this.currentTime = new Date();

    // Initiate year range.
    this.yearRange = new Range<number>();

    // Calculate year range.
    let iYear = this.currentTime.getFullYear();
    this.yearRange.from = iYear;
    this.yearRange.to = iYear + this.options.yearSelectionRange;
    this.yearsMatrix = this.getYearsMatrix(this.yearRange, this.options.yearsPerRow);

    // Calculate initial date.
    if (this.options != null && this.options.initial != null) {
      // TODO: Implement.
      this.updateDate();
    } else {
    }

    // Get months matrix.
    this.monthsMatrix = this.getMonthsMatrix();
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
  public updateDate() {

    switch (this.calendarSelectionMode) {
      case CalendarSelectionMode.year:
        this.yearsMatrix = this.getYearsMatrix(this.yearRange, this.options.yearsPerRow);
        this.datesMatrix = null;
        break;

      case CalendarSelectionMode.day:
        // Get list of dates which can be shown upon calendar.
        this.datesMatrix = this.getDatesMatrix(this.date.year, this.date.month);
        this.yearsMatrix = null;
        break;

    }
  }

  /*
   * Get datesMatrix of date which should be shown upon calendar in date selection mode.
   * */
  private getDatesMatrix(year: number, month: number): Array<Array<Date>> {

    // Get date datesMatrix.
    let date: Date = new Date();
    date.setFullYear(year, month, 1);

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
      let current:Date = _.cloneDeep(date);

      // Update date.
      current.setDate(iDay);
      current.setHours(0, 0, 0, 0);

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
  * Get months matrix.
  * */
  private getMonthsMatrix(): Array<Array<number>>{
    // Calculate months matrix.
    let iMonth = 1;
    let iMonthRowIndex = 0;
    let monthsMatrix: Array<Array<number>> = new Array<Array<number>>();

    while (iMonth < 13){

      if (monthsMatrix[iMonthRowIndex] == null)
        monthsMatrix[iMonthRowIndex] = new Array<number>();

      monthsMatrix[iMonthRowIndex].push(iMonth);

      if (iMonth % 3 == 0)
        iMonthRowIndex++;

      iMonth++;
    }

    return monthsMatrix;
  }

  /*
   * Check whether the date is today or not.
   * */
  private getToday(date: Date): boolean {

    // Date is not valid.
    if (date == null)
      return false;

    return (date.getFullYear() == this.currentTime.getFullYear() && date.getMonth() - 1 == this.currentTime.getMonth() && date.getDate() == this.currentTime.getDate());
  }

  /**
   * Update month to calendar.
   * @param month
   */
  private updateMonth(month: number) {
    let iMonth = this.date.getMonth();
    iMonth += month;
    this.date.setMonth(iMonth);
    this.updateDate();
  }

  /*
   * Get current year in system.
   * */
  private getCurrentYear(): number {
    return this.currentTime.getFullYear();
  }

  /*
  * Get current month in system.
  * */
  private getCurrentMonth(): number{
    return this.currentTime.getMonth();
  }
  /*
   * Make a year be selected.
   * */
  private selectYear(year: number): void {

    // Set year.
    this.date.setYear(year);

    // Let user select day.
    this.calendarSelectionMode = CalendarSelectionMode.month;

    // Re-draw date matrix.
    this.updateDate();
  }

  /*
  * Select month and jump to date select if possible.
  * */
  private selectMonth(month: number): void{
    this.date.setMonth(month);
    this.calendarSelectionMode = CalendarSelectionMode.day;
    this.updateDate();
  }

  /*
  * Select the specific date.
  * */
  private selectDay(day: number): void{
    this.date.setDay(day);
    this.updateDate();

    // Close drop-down menu.
    this.selection = _.cloneDeep(this.date);
    this.selectTimeEventEmitter.emit(this.selection);

    this.closeDropDown();
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

    this.updateDate();
  }

  /*
  * Check whether month is the current selected or not.
  * */
  private isCurrentMonth(month: number): boolean{

    // Year is different.
    if (this.date.getYear() != this.currentTime.getFullYear())
      return false;

    if (this.currentTime.getMonth() != month)
      return false;

    return true;
  }

  /*
  * This callback is fired when user clicks on drop down menu.
  * */
  private clickDropDownMenu(mouseEvent: MouseEvent): void{
    mouseEvent.stopPropagation();
    return;
  }

  /*
  * This function is for closing drop-down menu.
  * */
  private closeDropDown(): void{
    if (this.dropDownControl == null)
      return;

    let nativeElement = this.dropDownControl.nativeElement;
    if (nativeElement == null)
      return;

    nativeElement.classList.remove('open');
  }

  /*
  * Get classes for year buttons.
  * */
  private getYearButtonClass(year: number): string{
    let classes: Array<string> = new Array<string>();
    classes.push('btn');
    classes.push('btn-block');

    if (this.selection != null && this.selection.getYear() == year)
      classes.push('btn-primary');
    else if (year == this.getCurrentYear() && this.options.highLightCurrentYear)
      classes.push('btn-info');
    else
      classes.push('btn-default');

    return classes.reduce((x: string, y: string) => {
      return `${x} ${y}`;
    });
  }

  /*
  * Get display classes for month buttons base on specific conditions.
  * */
  private getMonthButtonClass(month: number): string{
    let classes: Array<string> = new Array<string>();

    if (this.selection != null && this.selection.getYear() == this.date.getYear() && month == this.selection.getMonth())
      classes.push('btn-primary');
    else if (this.date.getYear() == this.getCurrentYear() && month == this.getCurrentMonth() + 1 && this.options.highLightCurrentMonth)
      classes.push('btn-info');
    else
      classes.push('btn-default');

    // Default classes.
    classes.push('btn');
    classes.push('btn-block');

    return classes.reduce((x: string, y: string) => {
      return `${x} ${y}`;
    });
  }

  /*
   * Get display classes for month buttons base on specific conditions.
   * */
  private getDayClasses(date: Date): string{
    let classes: Array<string> = new Array<string>();

    // Default classes.
    classes.push('btn');
    classes.push('btn-block');

    if (this.selection != null && this.selection.dateCompare(date) == 0)
      classes.push('btn-primary');
    else if (this.getToday(date) && this.options.highLightCurrentDay)
      classes.push('btn-info');
    else
      classes.push('btn-default');

    return classes.reduce((x: string, y: string) => {
      return `${x} ${y}`;
    });
  }

  /*
  * Format datetime.
  * */
  private format(date: Date): string{
    return moment(date).format(this.options.format);
  }

  //#endregion
}
