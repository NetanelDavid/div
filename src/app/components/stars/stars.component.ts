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
    this.amountStars=new Array(5);
   }

   MakingRating(i:number){
     this.rating=i;
   }

  ngOnInit(): void {
  }

}
