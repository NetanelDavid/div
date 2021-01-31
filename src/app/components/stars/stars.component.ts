import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  
  amountStars:any[];
  rating:number;

  constructor() {
    this.rating=0;
    this.amountStars=new Array(5);
   }

   ret(rating:number):void{
     this.rating=rating;
   }


  ngOnInit(): void {
  }

}
