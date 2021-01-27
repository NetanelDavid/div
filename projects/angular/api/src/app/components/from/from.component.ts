import { Component, OnInit ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent implements OnInit {

  name:string;

  @Output() SearchDataEvent= new EventEmitter<string>();

  constructor() { }

  Search():void{
    this.SearchDataEvent.emit(this.name);
  }

  ngOnInit(): void {
  }

}
