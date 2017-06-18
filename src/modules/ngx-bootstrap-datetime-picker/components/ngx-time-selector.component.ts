/**
 * Created by Akai on 6/16/2017.
 */

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import * as _ from 'lodash';
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

  // Input field of hour.
  @ViewChild('hourInputField')
  private hourInputField: ElementRef;

  // Input field of minute.
  @ViewChild('minuteInputField')
  private minuteInputField: ElementRef;

  // Input field of second.
  @ViewChild('secondInputField')
  private secondInputField: ElementRef;

  // Emitter which should be emitted when title is clicked.
  @Output('click-title')
  private clickTitleEventEmitter: EventEmitter<void>;

  // Emitter which should be emitted when confirm button is clicked.
  @Output('click-confirm')
  private eClickConfirm: EventEmitter<Date>;

  //#endregion

  //#region Constructors

  /*
  * Initiate component with injector.
  * */
  public constructor(){
    this.selectTimeEventEmitter = new EventEmitter<Date>();
    this.clickTitleEventEmitter = new EventEmitter<void>();
    this.eClickConfirm = new EventEmitter<Date>()
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
  private changeHour(): void{
    if (this.hourInputField == null)
      return;

    let nativeElement = this.hourInputField.nativeElement;
    if (nativeElement == null)
      return;

    try{
      let iHour = parseInt(nativeElement.value);
      if (iHour == null || iHour == NaN)
        throw 'Value is invalid';

      if (iHour < 0)
        this.time.setHours(0);
      else if (iHour > 23)
        this.time.setHours(23);
      else
        this.time.setHours(iHour);
    } catch (exception){
      this.time.setHours(0);
    }
  }

  /*
  * Event which is called when minute is updated.
  * */
  private changeMinute(): void{
    if (this.minuteInputField == null)
      return;

    let nativeElement = this.minuteInputField.nativeElement;
    if (nativeElement == null)
      return;

    try{
      let iMinute = parseInt(nativeElement.value);
      if (iMinute == null || iMinute == NaN)
        throw 'Value is invalid';

      if (iMinute < 0)
        this.time.setMinutes(0);
      else if (iMinute > 59)
        this.time.setMinutes(59);
      else
        this.time.setMinutes(iMinute);
    } catch (exception){
      this.time.setMinutes(0);
    }
  }

  /*
  * Event which is called when second is updated.
  * */
  private changeSecond(): void{
    if (this.secondInputField == null)
      return;

    let nativeElement = this.secondInputField.nativeElement;
    if (nativeElement == null)
      return;

    try{
      let iSecond = parseInt(nativeElement.value);
      if (iSecond == null || iSecond == NaN)
        throw 'Value is invalid';

      if (iSecond < 0)
        this.time.setSeconds(0);
      else if (iSecond > 59)
        this.time.setSeconds(59);
      else
        this.time.setSeconds(iSecond);
    } catch (exception){
      this.time.setSeconds(0);
    }
  }

  /*
  * Event which is fired when confirm buton is clicked.
  * */
  private clickConfirm(): void{
    this.eClickConfirm.emit(this.time);
  }

  //#endregion
}
