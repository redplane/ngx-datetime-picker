/**
 * Created by Linh Nguyen on 6/13/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import * as _ from 'lodash';

@Component({
  selector: 'ngx-day-selector',
  templateUrl: 'ngx-day-selector.component.html',
})

export class NgxDaySelectorComponent{

  //#region Properties

  // Month which contains day.
  @Input('month')
  private month: number;

  // Year contain day.
  @Input('year')
  private year: number;

  // Title of week days.
  @Input('days-title')
  private dayTitles: Array<string>;

  // Title of months.
  @Input('months-title')
  private monthsTitle: Array<string>;

  // Date which has been selected.
  @Input('selected')
  private selected: Date;

  // Emitter which will be raised when date is selected.
  @Output('select-date')
  private selectDateEmitter: EventEmitter<Date>;

  // Emitter which will be raised when title is clicked.
  @Output('click-title')
  private clickTitleEventEmitter: EventEmitter<void>;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with settings.
  * */
  public constructor(){
    this.month = 0;
    this.year = 0;

    this.selectDateEmitter = new EventEmitter<Date>();
    this.clickTitleEventEmitter = new EventEmitter<void>();
  }

  //#endregion

  //#region Methods

  /*
   * Get datesMatrix of date which should be shown upon calendar in date selection mode.
   * */
  private getMatrixOfDays(): Array<Array<Date>> {

    // Get date datesMatrix.
    let date: Date = new Date();
    date.setFullYear(this.year, this.month, 1);

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
      let current: Date = _.cloneDeep(date);

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
   * Get max days of a month.
   * */
  private getMaxDays(year: number, month: number): number {
    return (new Date(year, month + 1, 0)).getDate();
  }

  /*
  * Select a date.
  * */
  public select(date: Date): void{
    this.selectDateEmitter.emit(date);
  }

  /*
  * This event is called when title is clicked.
  * */
  public clickTitle(): void{
    this.clickTitleEventEmitter.emit();
  }

  /**
   * Update month to calendar.
   * @param month
   */
  private updateMonth(month: number) {
    // Calculate month.
    let iMonth = this.month + month;
    if (iMonth < 0)
      iMonth = 0;
    else if (iMonth > 11)
      iMonth = 11;

    this.month = iMonth;
  }

  /*
  * Get date difference
  * */
  private getAbs(x: number){
    return Math.abs(x);
  }

  //#endregion
}
