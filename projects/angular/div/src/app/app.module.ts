import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FokusComponent } from './components/fokus/fokus.component';
import { AppComponent } from './components/main/app.component';
import { FruitsComponent } from './components/fruits/fruits.component';



const routes: Routes = [
  {path:'fokus',component:FokusComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FokusComponent,
    FruitsComponent,
  ],
  imports: [
    BrowserModule,
   RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
