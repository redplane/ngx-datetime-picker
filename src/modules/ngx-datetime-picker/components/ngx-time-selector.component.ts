/**
 * Created by Akai on 6/16/2017.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import * as _ from 'lodash';
import {NgxDate} from "../../models/ngx-date";
import * as moment from 'moment';

@Component({
  selector: 'ngx-time-selector',
  templateUrl: 'ngx-time-selector.component.html',
  styleUrls: ['ngx-time-selector.component.css']
})

export class NgxTimeSelectorComponent implements OnInit{

  //#region Properties

  // Date which has been selected.
  @Input('initial')
  private initial: Date;

  // Format date time.
  @Input('format')
  private format: string;

  // Time which has been set on server.
  private time: Date;

  // Emitter which should be raised when time is selected.
  private selectTimeEventEmitter: EventEmitter<Date>;

  // Emitter which should be emitted when title is clicked.
  @Output('click-title')
  private clickTitleEventEmitter: EventEmitter<void>;

  //#endregion

  //#region Constructors

  /*
  * Initiate component with injector.
  * */
  public constructor(){
    this.selectTimeEventEmitter = new EventEmitter<Date>();
    this.clickTitleEventEmitter = new EventEmitter<void>();
  }

  //#endregion

  //#region Methods

  // This function is called when component has been initiated successfully.
  public ngOnInit(): void {
    if (this.initial != null)
      this.time = _.cloneDeep(this.initial);
    else
      this.time = new Date();
  }

  /*
  * This function is for selecting a data.
  * */
  public select(date: Date): void{
    // Emit a time.
    this.selectTimeEventEmitter.emit(date);
  }

  public updateHour(hour: number): void{
    this.time.setHours(hour);
  }

  public updateMinute(minute: number): void{
    this.time.setMinutes(minute);
  }

  public updateSecond(second: number): void{
    this.time.setSeconds(second);
  }

  private display(date: Date): string{
    if (this.format == null || this.format.length < 1)
      return moment(date).format('YYYY-MM-DD');

    return moment(date).format(this.format);
  }

  /*
  * Event which is called when title is clicked.
  * */
  private clickTitle(): void{
    this.clickTitleEventEmitter.emit();
  }

  /*
   * Event which is called when hour is updated.
   * */
  private hookHourChange(event: Event): void{
    if (event == null)
      return;

    let srcElement = event.srcElement;
    if (srcElement == null)
      return;

    this.time.setMinutes(srcElement['value']);
  }

  /*
  * Event which is called when minute is updated.
  * */
  private hookMinuteChange(event: Event): void{
    if (event == null)
      return;

    let srcElement = event.srcElement;
    if (srcElement == null)
      return;

    this.time.setMinutes(srcElement['value']);
  }

  /*
  * Event which is called when second is updated.
  * */
  private hookSecondChange(event: Event): void{
    if (event == null)
      return;

    let srcElement = event.srcElement;
    if (srcElement == null)
      return;

    this.time.setSeconds(srcElement['value']);
  }
  //#endregion
}
