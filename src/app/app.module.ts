import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FokusComponent } from './components/fokus/fokus.component';
import { AppComponent } from './components/main/app.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { FruitComponent } from './components/fruit/fruit.component';
import { ReadingComponent } from './components/reading/reading.component';



const routes: Routes = [
  {path:'fokus',component:FokusComponent},
  {path:'fruits',component:FruitsComponent},
  {path:'',component:FruitsComponent}  //pemp
];

@NgModule({
  declarations: [
    AppComponent,
    FokusComponent,
    FruitsComponent,
    FruitComponent,
    ReadingComponent,
  ],
  imports: [
    BrowserModule,
   RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
