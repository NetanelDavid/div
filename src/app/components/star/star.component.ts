import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit ,OnChanges{

  @Input()id:number;
  @Input()rating:number;
  @Output() UserRated: EventEmitter<number>;
  
  classes:object;

  constructor() { 
    this.UserRated=new EventEmitter<number>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rating=changes.rating.currentValue;
    this.updatingClasses();
  }

  ngOnInit(): void {
    this.updatingClasses();
  }
  
  updatingClasses():void{
    this.classes={
      'fas fa-star':this.rating>=this.id,
      'far fa-star':true,
    }
  }

  ret():void{
    this.UserRated.emit(this.id);
  }

}
