import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SonComponent } from './son/son.component';
import { Son2Component } from './son2/son2.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path: 'aa',component:SonComponent },
  {path: 'bb',component:Son2Component }
];

@NgModule({
  declarations: [
    AppComponent,
    SonComponent,
    Son2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
