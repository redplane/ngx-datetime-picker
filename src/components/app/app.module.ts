import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {NgxBootstrapDateTimePickerModule} from "../../modules/ngx-bootstrap-datetime-picker/ngx-bootstrap-datetime-picker.module";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";

@NgModule({
  declarations: [
    AppComponent,

    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    NgxBootstrapDateTimePickerModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
