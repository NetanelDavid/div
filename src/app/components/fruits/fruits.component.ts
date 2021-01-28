import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { FruitsModel } from 'src/app/models/fruits.model';

@Component({
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {


  fruits:FruitsModel[];
  constructor() { 
    this.fruits=[
      { name:'בננה',
        FirstBlessing:'האדמה',
        url:new URL('https://en.wikipedia.org/wiki/Banana'),
        img:'https://github.com/NetanelDavid/div/blob/main/images/banana.jpg?raw=true',
      },{ name:'תפוח',
          FirstBlessing:'העץ',
          url:new URL('https://en.wikipedia.org/wiki/Apple'),
          img:'https://github.com/NetanelDavid/div/blob/main/images/apple.jpg?raw=true',
      },{ name:'אגס',
          FirstBlessing:'העץ',
          url:new URL('https://en.wikipedia.org/wiki/Pear'),
          img:'https://github.com/NetanelDavid/div/blob/main/images/pear.jpg?raw=true',
      }
    ]
  }


  ngOnInit(): void {
  }

}
