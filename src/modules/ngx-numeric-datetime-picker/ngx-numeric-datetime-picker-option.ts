/**
 * Created by Linh Nguyen on 6/1/2017.
 */
export class NgxNumericDateTimePickerOption{

  //#region Properties

  // Whether time picker is supported or not.
  public bTimePickerSupport: boolean;

  // Date should be set to component when it has been initiated.
  public initial: Date;

  public iMinYear: number;

  public iMaxYear: number;

  public placeHolder: string;

  // Format of display date time.
  public format: string;

  //#endregion

  //#region Constructor

  public constructor(){
    this.iMinYear = 0;
    this.iMaxYear = 9999;
  }

  //#endregion
}
