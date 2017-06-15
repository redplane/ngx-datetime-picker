/**
 * Created by Linh Nguyen on 6/13/2017.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import * as _ from 'lodash';

@Component({
  selector: 'ngx-month-selector',
  templateUrl: 'ngx-month-selector.component.html'
})

export class NgxMonthSelectorComponent implements OnInit{

  //#region Properties

  // Year contains months.
  @Input('initial-year')
  private initial: number;

  // Titles of months.
  @Input('titles')
  private titles: Array<string>;

  // Time which has been selected before.
  @Input('selected')
  private selected: Date;

  // Event emitter which will be emitted when month is selected.
  @Output('select-month')
  private selectMonthEventEmitter: EventEmitter<Date>;

  // Event emitter which will be emitted when title is clicked.
  @Output('click-title')
  private clickTitleEventEmitter: EventEmitter<void>;

  // Year contains months.
  private year: number;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with settings.
  * */
  public constructor(){
    this.selectMonthEventEmitter = new EventEmitter<Date>();
    this.clickTitleEventEmitter = new EventEmitter<void>();
  }

  //#endregion

  //#region Methods

  /*
  * This event is fired when component has been initialized successfully.
  * */
  public ngOnInit(): void {
    this.year = this.initial;
  }

  /*
   * Get months matrix.
   * */
  private getMonthsMatrix(): Array<Array<Date>> {

    // Initiate date instance.
    let date: Date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setFullYear(this.year);

    // Calculate months matrix.
    let iCounter = 0;

    // Row index initialization.
    let iMonthRowIndex = 0;
    let monthsMatrix: Array<Array<Date>> = new Array<Array<Date>>();

    for (let iMonth = 0; iMonth < 12; iMonth++) {

      // Copy source date instance.
      let month: Date = _.cloneDeep(date);
      month.setMonth(iMonth);

      // Initiate matrix if it is not available.
      if (monthsMatrix[iMonthRowIndex] == null)
        monthsMatrix[iMonthRowIndex] = new Array<Date>();

      // Add month to matrix.
      monthsMatrix[iMonthRowIndex].push(month);

      iCounter++;

      // Initiate new row.
      if (iCounter >= 4) {
        iMonthRowIndex++;
        iCounter = 0;
      }
    }

    return monthsMatrix;
  }

  /*
  * Event is called when title is clicked.
  * */
  private clickTitle(): void{
    this.clickTitleEventEmitter.emit();
  }

  /*
   * Select month and jump to date select if possible.
   * */
  private selectMonth(month: Date): void {
    this.selectMonthEventEmitter.emit(month);
  }

  /*
  * Update year.
  * */
  private updateYear(year: number): void{
    this.year += year;
  }

  //#endregion
}
