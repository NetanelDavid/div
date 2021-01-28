import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FruitsModel } from 'src/app/models/fruits.model';
import { ReadingListService } from 'src/app/services/reading-list.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {

  Listreading:FruitsModel[];
  Subscrip:Subscription;

  constructor(private readinglistservice:ReadingListService) {

  }
  
  ngOnInit(): void {
    this.Subscrip = this.readinglistservice.get().subscribe(updating =>{
      this.Listreading=updating
    })   
  }

  unsub():void{
    this.Subscrip.unsubscribe();
  }


}
