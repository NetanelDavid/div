import { Component, OnInit } from '@angular/core';
import { FruitsModel } from 'src/app/models/fruits.model';
import { ReadingListService } from 'src/app/services/reading-list.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {

  Listreading:FruitsModel[];

  constructor(private readinglistservice:ReadingListService) {
   
  }
  
  ngOnInit(): void {
    setInterval(() => {
      this.Listreading=this.readinglistservice.get();
      },1)
  }


}
