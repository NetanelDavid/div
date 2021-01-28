import { Component, Input, OnInit } from '@angular/core';
import { FruitsModel } from 'src/app/models/fruits.model';
import { ReadingListService } from 'src/app/services/reading-list.service';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.css']
})
export class FruitComponent implements OnInit {

 @Input()fruit :FruitsModel;

  name:string;
  FirstBlessing:string;
  LestBlessing:string;
  url:URL;
  img:string;


  constructor(private readinglistservice:ReadingListService) { 

  }

  ngOnInit(): void {

    this.name=this.fruit.name;
    this.FirstBlessing=this.fruit.FirstBlessing;
    this.url=this.fruit.url;
    this.img=this.fruit.img;
  }

  AddToList():void{
    this.readinglistservice.add(this.fruit);
  }

}
