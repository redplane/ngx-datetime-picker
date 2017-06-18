/**
 * Created by Linh Nguyen on 6/1/2017.
 */
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {NgxNumericDateTimePickerOption} from "./ngx-numeric-datetime-picker-option";
import {NgxDateTimePickerEditorMode} from "./enumerations/ngx-datetime-picker-editor-mode";
import {NgxDate} from "../models/ngx-date";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'ngx-numeric-datetime-picker',
  templateUrl: 'ngx-numeric-datetime-picker.component.html',
  styleUrls: ['ngx-numeric-datetime-picker.css', 'clutterboard-theme.css'],
  exportAs: 'ngx-numeric-datetime-picker'
})

export class NgxNumericDateTimePickerComponent implements OnInit {

  //#region Properties

  @ViewChild('control')
  private control: ElementRef;

  // Min hour.
  private iMinHour: number = 0;

  // Max hour.
  private iMaxHour: number = 23;

  // Minimum month of year.
  private iMinMonth: number = 1;

  // Maximum month of year.
  private iMaxMonth: number = 12;

  // Numeric datetime picker option.
  @Input('options')
  private options: NgxNumericDateTimePickerOption;

  // List of months names.
  private monthNames: Array<string>;

  // List of day names.
  private dayNames: Array<string>;

  // Input box of day.
  @ViewChild('dayBox')
  private dayBox: ElementRef;

  // Input box of month.
  @ViewChild('monthBox')
  private monthBox: ElementRef;

  // Input box of year.
  @ViewChild('yearBox')
  private yearBox: ElementRef;

  // Input box of hour.
  @ViewChild('hourBox')
  private hourBox: ElementRef;

  // Input box of minute.
  @ViewChild('minuteBox')
  private minuteBox: ElementRef;

  // Input box of second.
  @ViewChild('secondBox')
  private secondBox: ElementRef;

  // Editor mode of control.
  private editorMode: NgxDateTimePickerEditorMode;

  // Store time configuration.
  private time: NgxDate;

  // Time which has been selected.
  private selection: NgxDate;

  // Enumeration reference.
  private NgxDateTimePickerEditorMode = NgxDateTimePickerEditorMode;

  //#endregion

  //#region Event emitters

  // Event which is fired when a date is selected.
  @Output('select-date')
  private readonly selectDateEmitter: EventEmitter<Date>;

  //#endregion

  //#region Constructor

  // Initiate component with default settings.
  public constructor(public changeDetectorRef: ChangeDetectorRef) {
    // Initiate date with current time.
    let date = new Date();
    this.time = new NgxDate();
    this.time.update(date);

    // List of month name.
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Initiate event emitters.
    this.selectDateEmitter = new EventEmitter<Date>();
  }

  //#endregion

  //#region Methods

  /*
  * This event is called when component has been initiated or not.
  * */
  public ngOnInit(): void {
    if (this.options.initial != null) {
      this.time.update(this.options.initial);
    }
  }

  /*
  * Update hour.
  * */
  private updateHour(hour: number): void {
    let iHour = this.time.hour + hour;
    if (iHour > this.iMaxHour)
      iHour = this.iMaxHour;
    else if (iHour < this.iMinHour)
      iHour = this.iMinHour;
    this.time.hour = iHour;
  }

  /*
  * Update minute to control.
  * */
  private updateMinute(minute: number): void {
    let iMinute = this.time.minute + minute;
    if (iMinute < 0)
      iMinute = 0;
    else if (iMinute > 59)
      iMinute = 59;

    this.time.minute = iMinute;
  }

  /*
  * Update second.
  * */
  private updateSecond(second: number): void{
    let iSecond = this.time.second + second;
    if (iSecond < 0)
      iSecond = 0;
    else if (iSecond > 59)
      iSecond = 59;

    this.time.second = iSecond;
  }

  /*
  * Update year.
  * */
  private updateYear(year: number): void {
    let iYear = this.time.year + year;
    if (iYear < 0)
      iYear = 0;
    else if (iYear > 9999)
      iYear = 9999;

    this.time.year = iYear;
  }

  /*
   * Update month.
   * */
  private updateMonth(month: number): void {
    let iMonth = this.time.month + month;
    if (iMonth > this.iMaxMonth)
      iMonth = this.iMinMonth;
    else if (iMonth < this.iMinMonth)
      iMonth = this.iMaxMonth;

    this.time.month = iMonth;
  }

  /*
   * Update date.
   * */
  private updateDate(date: number): void {

    // Cancel focus.
    this.cancelFocus(this.editorMode);

    let iMaxDay = this.getMaxDays(this.time.year, this.time.month);
    let iDay = this.time.day + date;
    if (iDay < 1)
      iDay = iMaxDay;
    else if (iDay > iMaxDay)
      iDay = 1;
    this.time.day = iDay;
  }

  /*
  * Cancel focus on a control.
  * */
  private cancelFocus(mode: NgxDateTimePickerEditorMode): void {
    if (mode == this.editorMode) {
      this.editorMode = null;

      switch (mode) {
        case NgxDateTimePickerEditorMode.year:
          try {
            let szYear = this.time.year.toString();
            let iYear = parseInt(szYear);

            if (!iYear)
              throw 'Invalid year';

            if (iYear < this.options.iMinYear)
              this.time.year = this.options.iMinYear;
            else if (iYear > this.options.iMaxYear)
              this.time.year = this.options.iMaxYear;
            else
              this.time.year = iYear;

          } catch (exception) {
            this.time.year = this.options.iMinYear;
          }
          break;

        case NgxDateTimePickerEditorMode.month:
          try {
            let szMonth = this.time.month.toString();
            let iMonth = parseInt(szMonth);

            if (!iMonth)
              throw 'Invalid month';

            if (iMonth < this.iMinMonth)
              this.time.month = this.iMinMonth;
            else if (iMonth > this.iMaxMonth)
              this.time.month = this.iMaxMonth;
            else
              this.time.month = iMonth;

          } catch (exception) {
            this.time.month = this.iMinMonth;
          }
          break;

        case NgxDateTimePickerEditorMode.day:
          try {
            let szDay = this.time.day.toString();
            let iDay = parseInt(szDay);
            let iMaxDay = this.getMaxDays(this.time.year, this.time.month);
            if (!iDay)
              throw 'Invalid day';

            if (iDay < 1)
              this.time.day = 1;
            else if (iDay > iMaxDay)
              this.time.day = iMaxDay;
            else
              this.time.day = iDay;

          } catch (exception) {
            this.time.day = 1;
          }
          break;

        case NgxDateTimePickerEditorMode.hour:
          try {
            let szHour = this.time.hour.toString();
            let iHour = parseInt(szHour);
            if (!iHour)
              throw 'Invalid hour';

            if (iHour < this.iMinHour)
              this.time.hour = this.iMinHour;
            else if (iHour > this.iMaxHour)
              this.time.hour = this.iMaxHour;
            else
              this.time.hour = iHour;

          } catch (exception) {
            this.time.hour = this.iMinHour;
          }
          break;

        case NgxDateTimePickerEditorMode.minute:
          try {
            let szMinute = this.time.minute.toString();
            let iMinute = parseInt(szMinute);
            if (iMinute == NaN)
              throw 'Invalid minute';

            if (iMinute < 0)
              this.time.minute = 0;
            else if (iMinute > 59)
              this.time.minute = 59;
            else
              this.time.minute = iMinute;

          } catch (exception) {
            this.time.minute = 0;
          }
          break;

        case NgxDateTimePickerEditorMode.second:
          try {
            let szSecond = this.time.second.toString();
            let iSecond = parseInt(szSecond);
            if (iSecond == NaN)
              throw 'Invalid minute';

            if (iSecond < 0)
              this.time.second = 0;
            else if (iSecond > 59)
              this.time.second = 59;
            else
              this.time.second = 0;

          } catch (exception) {
            this.time.second = 0;
          }
          break;
      }
    }
  }

  /*
  * Base on option to focus to specific element.
  * */
  private focus(mode: NgxDateTimePickerEditorMode): void {

    // Update editor mode.
    this.editorMode = mode;
    this.changeDetectorRef.detectChanges();

    switch (mode) {

      case NgxDateTimePickerEditorMode.day:
        this.dayBox.nativeElement.focus();
        break;

      case NgxDateTimePickerEditorMode.month:
        this.monthBox.nativeElement.focus();
        break;

      case NgxDateTimePickerEditorMode.year:
        this.yearBox.nativeElement.focus();
        break;

      case NgxDateTimePickerEditorMode.hour:
        this.hourBox.nativeElement.focus();
        break;

      case NgxDateTimePickerEditorMode.minute:
        this.minuteBox.nativeElement.focus();
        break;

      case NgxDateTimePickerEditorMode.second:
        this.secondBox.nativeElement.focus();
        break;
    }
  }

  // This event is fired when user clicks on drop-down menu.
  private clickDropdownMenu(event: MouseEvent): void {

    // Prevent default behaviour.
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  // Get max days of a month.
  private getMaxDays(year: number, month: number): number {
    return (new Date(this.time.year, this.time.month + 1, 0)).getDate();
  }

  /*
  * Confirm date selection.
  * */
  private confirmSelection(): void{

    // Cancel focus.
    this.cancelFocus(this.editorMode);

    // Update the selection.
    this.selection = _.cloneDeep(this.time);

    // Close the drop-down menu.
    this.control.nativeElement.classList.remove('open');

    // Emit event.
    this.selectDateEmitter.emit(this.time.toDateTime());
  }

  /*
  * Update the date
  * */
  public update(date: Date): void{
    let ngxDateTime = new NgxDate();
    ngxDateTime.update(date);
    ngxDateTime.setMonth(ngxDateTime.getMonth() + 1);

    this.time = ngxDateTime;
  }

  /*
  * Clear selection date.
  * */
  public clearSelection(): void{
    this.selection = null;
  }

  /*
   * Format date.
   * */
  private format(date: Date): string{
    if (date == null)
      return null;

    if (this.options == null || this.options.format == null || this.options.format == null || this.options.format.length < 1)
      return date.toDateString();

    return moment(date).format(this.options.format);
  }

  //#endregion
}
