import { Injectable } from '@angular/core';
import { FruitsModel } from '../models/fruits.model';

@Injectable({
  providedIn: 'root'
})
export class ReadingListService {

  constructor() { 
    this.ReadingList=[];
  }

  ReadingList:FruitsModel[];

  add(f:FruitsModel):void{
    if(!this.ReadingList.find(ftu => ftu.id === f.id)){
      this.ReadingList = [...this.ReadingList,f];
    }
  }
  
  get():FruitsModel[]{
    return this.ReadingList;
  }
}
