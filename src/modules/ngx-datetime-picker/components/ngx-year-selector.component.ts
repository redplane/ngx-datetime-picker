/**
 * Created by Linh Nguyen on 6/13/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgxRange} from "../../models/ngx-range";
import * as _ from 'lodash';

@Component({
  selector: 'ngx-year-selector',
  templateUrl: 'ngx-year-selector.component.html'
})

export class NgxYearSelectorComponent{

  //#region Properties

  // Range of years.
  @Input('years-range')
  private range: NgxRange<number>;

  // Initial range.
  @Input('initial')
  private initial: Date;

  // Time which has been selected.
  @Input('selected')
  private selected: Date;

  // Range of selection.
  @Input('selection-range')
  private selectionRange: number;

  // How many years can be displayed on a row.
  @Input('years-on-row')
  private yearsOnRow: number;

  // This event emitter will be raised when a year is selected.
  @Output('select-year')
  private selectYearEventEmitter: EventEmitter<Date>;

  // This event is fired when range should be updated.
  @Output('update-range')
  private updateRangeEventEmitter: EventEmitter<number>;

  //#endregion

  //#region Constructor

  /*
  * Initiate component with default settings.
  * */
  public constructor(){
    this.selectYearEventEmitter = new EventEmitter<Date>();
    this.updateRangeEventEmitter = new EventEmitter<number>();
  }

  //#endregion

  //#region Methods

  /*
  * Swap range.
  * */
  private swap(range: NgxRange<number>): NgxRange<number>{

    // Range is invalid.
    if (range == null)
      return range;

    if (range.to > range.from)
      return range;

    let iTemporary = range.from;
    range.from = range.to;
    range.to = iTemporary;

    return range;
  }


  /*
   * Get years list.
   * */
  private getYearsMatrix(): Array<Array<Date>> {


    // Range is null.
    if (this.range == null)
      return;

    // Initiate source year.
    let date: Date = new Date();
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);

    // Initiate years list.
    let years: Array<Array<Date>> = new Array<Array<Date>>();

    // Grid column and row.
    let iRow = 0;
    let iColumn = 0;

    // Swap, in case of range is invalid.
    let range = this.swap(this.range);

    // Initiate range list.
    for (let iYear = range.from; iYear < range.to; iYear++){
      let item: Date = _.cloneDeep(date);
      item.setFullYear(iYear);

      // Year hasn't been initialized. Initialize it.
      if (years[iRow] == null)
        years[iRow] = new Array<Date>();

      years[iRow].push(item);
      iColumn++;

      // Maximum column exceeded.
      if (iColumn >= this.yearsOnRow){
        iColumn = 0;
        iRow++;
      }
    }

    return years;
  }

  /*
  * Update range of years.
  * */
  private updateRange(range: number): void{
    this.updateRangeEventEmitter.emit(range);
  }

  /*
  * Select year.
  * */
  private select(date: Date): void{
    this.selectYearEventEmitter.emit(date);
  }
  //#endregion
}
