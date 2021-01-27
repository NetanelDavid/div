import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { FruitsModel } from 'src/app/models/fruits.model';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {


  fruits:FruitsModel[];
  constructor() { 

    this.fruits=[
      { id:0,
        name:'banana',
        FirstBlessing:'aadsma',
        LestBlessing:'bore nefosoth',
        url:new URL('https://en.wikipedia.org/wiki/Banana'),
        img:'https://drive.google.com/file/d/1EKyma5vTq94C8J57HoAcQNAcd8rsUckF/view?usp=sharing',
      },{
        id:1,
        name:'apple',
        FirstBlessing:'aetz',
        LestBlessing:'bore nefosoth',
        url:new URL('https://en.wikipedia.org/wiki/Apple'),
        img:'https://drive.google.com/file/d/1L2NHySSDJ8P2z3SjqJbHupjwXcdXnQSv/view?usp=sharing',
      },{
        id:2,
        name:'pear',
        FirstBlessing:'aetz',
        LestBlessing:'bore nefosoth',
        url:new URL('https://en.wikipedia.org/wiki/Pear'),
        img:'https://drive.google.com/file/d/1DuFQlGhJrUDikvG5TVIc4JaqxtY61059/view?usp=sharing',
      }
    ]
  }


  ngOnInit(): void {
  }

}
