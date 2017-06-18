/**
 * Created by Linh Nguyen on 6/1/2017.
 */
import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild, Output} from "@angular/core";
import {NgxDateTimePickerOption} from "./ngx-bootstrap-datetime-picker-option";
import * as _ from 'lodash';
import {CalendarSelectionMode} from "./enumerations/calendar-selection-mode";

import * as moment from 'moment';
import {NgxRange} from "../models/ngx-range";

@Component({
  selector: 'ngx-datetime-picker',
  templateUrl: 'ngx-bootstrap-datetime-picker.component.html',
  styleUrls: ['ngx-bootstrap-datetime-picker.css'],
  exportAs: 'ngx-bootstrap-datetime-picker'
})

export class NgxBootstrapDateTimePickerComponent implements OnInit {

  //#region Constructor

  // Date time picker setting
  @Input('options')
  private options: NgxDateTimePickerOption;

  @ViewChild('dropDownControl')
  private dropDownControl: ElementRef;

  // Instance store date object.
  private date: Date;

  // Instance which represent date selection.
  private selection: Date;

  // Calendar selection mode
  private calendarSelectionMode: CalendarSelectionMode;

  // Enumeration reflection.
  private CalendarSelectionMode = CalendarSelectionMode;

  // Range of years.
  private years: NgxRange<number>;

  /*
   * This event is fired when time is selected.
   * */
  @Output('select-time')
  private selectTimeEventEmitter: EventEmitter<Date>;

  /*
   * Current time of the system.
   * */
  private current: Date;

  //#endregion

  //#region Constructor

  // Initiate constructor with default settings.
  public constructor() {
    this.options = new NgxDateTimePickerOption();
    this.date = new Date();

    this.selectTimeEventEmitter = new EventEmitter<Date>();
  }

  //#endregion

  //#region Methods

  // This event is called when component has been initiated successfully.
  public ngOnInit(): void {

    // Set default calendar selection mode.
    this.calendarSelectionMode = CalendarSelectionMode.year;

    // Get current system time.
    this.current = new Date();

    // Calculate initial date.
    if (this.options != null && this.options.initial != null)
      this.date = _.cloneDeep(this.options.initial);


    // Update range of years.
    let iYear = this.current.getFullYear();
    this.years = new NgxRange<number>();
    this.years.from = iYear;
    this.years.to = iYear + this.options.yearSelectionRange;
  }

  /*
   * Check whether the date is today or not.
   * */
  private getToday(date: Date): boolean {

    // Date is not valid.
    if (date == null)
      return false;

    return (date.getFullYear() == this.current.getFullYear() && date.getMonth() - 1 == this.current.getMonth() && date.getDate() == this.current.getDate());
  }



  /*
   * Get current year in system.
   * */
  private getCurrentYear(): number {
    return this.current.getFullYear();
  }

  /*
   * Get current month in system.
   * */
  private getCurrentMonth(): number {
    return this.current.getMonth();
  }

  /*
   * Make a year be selected.
   * */
  private clickYear(item: Date): void {
    // Set year.
    this.date.setFullYear(item.getFullYear());

    // Let user select day.
    this.calendarSelectionMode = CalendarSelectionMode.month;
  }

  /*
  * Event which is fired when month button is clicked.
  * */
  private clickMonth(item: Date): void{
    // Set month.
    this.date.setFullYear(item.getFullYear(), item.getMonth(), 1);
    this.date.setMonth(item.getMonth());

    this.calendarSelectionMode = CalendarSelectionMode.day;
  }

  /*
   * Select the specific date.
   * */
  private clickDate(item: Date): void {
    // Update current selection.
    this.date.setFullYear(item.getFullYear(), item.getMonth(), item.getDate());

    // Change to time.
    this.calendarSelectionMode = CalendarSelectionMode.time;
  }

  /*
  * Called when time is selected.
  * */
  private clickTime(item: Date): void{

    // Update current selection.
    this.date.setFullYear(item.getFullYear(), item.getMonth(), item.getDate());

    // Set time.
    this.date.setHours(item.getHours(), item.getMinutes(), item.getSeconds());

    // Set selection to current item.
    this.setSelection(this.date);

    // Close drop-down.
    this.closeDropDown();
  }
  /*
   * This callback is fired when user clicks on drop down menu.
   * */
  private clickDropDownMenu(mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
    return;
  }

  /*
   * This function is for closing drop-down menu.
   * */
  private closeDropDown(): void {
    if (this.dropDownControl == null)
      return;

    let nativeElement = this.dropDownControl.nativeElement;
    if (nativeElement == null)
      return;

    nativeElement.classList.remove('open');
  }

  /*
   * Format datetime.
   * */
  private format(date: Date): string {
    return moment(date).format(this.options.format);
  }

  /*
  * This event is fired when years range is updated.
  * */
  private updateYears(range: number): void{
    this.years.from += range;
    this.years.to += range;
  }

  /*
  * Clear selection.
  * */
  public clearSelection(): void{
    this.selection = null;
    this.calendarSelectionMode = CalendarSelectionMode.year;
    this.selectTimeEventEmitter.emit(null);
  }

  /*
  * Raise selection event.
  * */
  public setSelection(date: Date): void{

    // Set selection.
    this.selection = date;

    // Emit event.
    this.selectTimeEventEmitter.emit(date);
  }


  //#endregion
}
