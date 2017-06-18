import {Component, Input, ViewChild} from '@angular/core';
import {NgxBootstrapDateTimePickerComponent} from '../../node_modules/ngx-bootstrap-datetime-picker/ngx-bootstrap-datetime-picker/ngx-bootstrap-datetime-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //#region Properties

  // Bootstrap datetime picker component.
  @ViewChild('ngxBootstrapDateTimePicker')
  private ngxBootstrapDateTimePicker: NgxBootstrapDateTimePickerComponent;

  //#endregion

  //#region Constructor

  //#endregion

  //#region Methods

  /*
   * Called when time is selected.
   * */
  public selectTime(date: Date): void{
    console.log(date);
  }

  /*
   * Called when time is cleared.
   * */
  public clearSelection(): void{
    this.ngxBootstrapDateTimePicker.clearSelection();
  }

  /*
  * Set today as selected.
  * */
  public setToday(): void{
    let date = new Date();
    this.ngxBootstrapDateTimePicker.setSelection(date);
  }
  //#endregion

}
