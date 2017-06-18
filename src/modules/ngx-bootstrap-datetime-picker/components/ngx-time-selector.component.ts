/**
 * Created by Akai on 6/16/2017.
 */

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import * as _ from 'lodash';
import * as moment from 'moment';
import {NgxDate} from "../../models/ngx-date";

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
  private time: NgxDate;

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

    // Initiate time.
    this.time = new NgxDate();

    this.selectTimeEventEmitter = new EventEmitter<Date>();
    this.clickTitleEventEmitter = new EventEmitter<void>();
    this.eClickConfirm = new EventEmitter<Date>()
  }

  //#endregion

  //#region Methods

  // This function is called when component has been initiated successfully.
  public ngOnInit(): void {
    // Initiate is specified.
    if (this.initial != null) {
      this.time = new NgxDate();
      this.time.update(this.initial);
    }
    else {
      let time = new Date();
      this.time.update(time);
    }
  }

  /*
  * This function is for selecting a data.
  * */
  public select(date: Date): void{
    // Emit a time.
    this.selectTimeEventEmitter.emit(date);
  }

  /*
  * Update hour by increasing or decreasing value.
  * */
  public updateHour(hour: number): void{
    // Parse and validate hour.
    this.changeHour();

    // Update hour.
    let iHour: number = this.time.getHour();
    iHour += hour;
    this.time.setHour(iHour);

    // Update hour.
    //this.changeHour();
  }

  /*
  * Update minute by increase or decreasing value.
  * */
  public updateMinute(minute: number): void{
    // Parse and validate hour.
    this.changeMinute();

    // Update minute.
    let iMinute: number = this.time.getMinute();
    iMinute += minute;
    this.time.setMinute(iMinute);

    // Update minute.
    //this.changeMinute();
  }

  /*
  * Update second by increasing or decreasing second.
  * */
  public updateSecond(second: number): void{
    // Parse and validate hour.
    this.changeSecond();

    // Update minute.
    let iSecond: number = this.time.getSecond();
    iSecond += second;
    this.time.setSecond(iSecond);

    // Update minute.
    //this.changeSecond();
  }

  /*
  * Display date by using specific format.
  * */
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
      if (!iHour)
        throw 'Value is invalid';

      if (iHour < 0)
        iHour = 0;
      else if (iHour > 23)
        iHour = 23;

      this.time.setHour(iHour);
      nativeElement.value = iHour;
    } catch (exception){
      this.time.setHour(0);
      nativeElement.value = 0;
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
      if (!iMinute)
        throw 'Value is invalid';

      if (iMinute < 0)
        iMinute = 0;
      else if (iMinute > 59)
        iMinute = 59;

      this.time.setMinute(iMinute);
      nativeElement.value = iMinute;
    } catch (exception){
      this.time.setMinute(0);
      nativeElement.value = 0;
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
      if (!iSecond)
        throw 'Value is invalid';

      if (iSecond < 0)
        iSecond = 0;
      else if (iSecond > 59)
        iSecond = 59;

      this.time.setSecond(iSecond);
      nativeElement.value = iSecond;
    } catch (exception){
      this.time.setSecond(0);
      nativeElement.value = 0;
    }
  }

  /*
  * Event which is fired when confirm buton is clicked.
  * */
  private clickConfirm(): void{

    // Initiate ngx date.
    let ngxDate: NgxDate = _.cloneDeep(this.time);
    ngxDate.setMonth(this.time.getMonth() + 1);

    this.eClickConfirm.emit(ngxDate.toDateTime());
  }

  //#endregion
}
