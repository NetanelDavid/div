import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/main/app.component';
import { FromComponent } from './components/from/from.component';
import { ShowComponent } from './components/show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    FromComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
