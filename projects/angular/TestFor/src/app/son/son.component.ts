import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {

  counter:number;

  constructor() {
   this.counter=0;
  }

 

  UserClick():void{
    this.counter++;
  }
  

  ngOnInit(): void {
  }

}
