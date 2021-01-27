import { Component, Input, OnInit } from '@angular/core';
import { FruitsModel } from 'src/app/models/fruits.model';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.css']
})
export class FruitComponent implements OnInit {

 @Input()fruit :FruitsModel;

  id:number;
  name:string;
  FirstBlessing:string;
  LestBlessing:string;
  url:URL;
  img:string;


  constructor() { 

  }

  ngOnInit(): void {

    this.id = this.fruit.id;
    this.name=this.fruit.name;
    this.FirstBlessing=this.fruit.FirstBlessing;
    this.LestBlessing=this.fruit.LestBlessing;
    this.url=this.fruit.url;
    this.img=this.fruit.img;
  }

}
