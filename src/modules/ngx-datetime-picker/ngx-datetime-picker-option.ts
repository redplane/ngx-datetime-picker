/**
 * Created by Linh Nguyen on 6/2/2017.
 */
export class NgxDateTimePickerOption{

  //#region Properties

  // Title of days in week (From sunday - saturday)
  public daysTitle: Array<string>;

  // Title of months in year (From january - february).
  public monthsTitle: Array<string>;

  // Initial date which calendar should start from.
  public initial: Date;

  // Whether today should be highlight.
  public highLightCurrentDay: boolean;

  // Whether current month should be highlight.
  public highLightCurrentMonth: boolean;

  // Whether current year should be highlighted.
  public highLightCurrentYear: boolean;

  // NgxRange of year in year selection mode.
  public yearSelectionRange: number;

  // Number of years per row.
  public yearsPerRow: number;

  // Format of time display.
  public format: string;

  //#endregion

  //#region Constructor

  /*
  * Initiate option with default settings.
  * */
  public constructor(){
    this.daysTitle = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.monthsTitle = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.yearSelectionRange = 20;
    this.yearsPerRow = 5;
    this.highLightCurrentYear = true;
    this.highLightCurrentMonth = true;
    this.highLightCurrentDay = true;
    this.format = 'YYYY-MM-DD HH:mm:ss';
  }

  //#endregion
}
