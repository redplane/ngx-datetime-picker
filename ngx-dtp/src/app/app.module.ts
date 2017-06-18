import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NgxBootstrapDateTimePickerModule} from '../../node_modules/ngx-bootstrap-datetime-picker/ngx-bootstrap-datetime-picker/ngx-bootstrap-datetime-picker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxBootstrapDateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
