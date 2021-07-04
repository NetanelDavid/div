import { Component, Input, OnInit, Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit ,OnChanges {
  
  @Input() percentage : number;
  activ: boolean;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes && changes.percentage && changes.percentage.currentValue && changes.percentage.currentValue < 100) {
      this.activ = true;
      this.percentage = changes.percentage.currentValue;
    }
    else {
      this.percentage = 0;
      this.activ = false;
    }
  }

 

  ngOnInit(): void {}

}