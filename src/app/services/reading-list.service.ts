import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FruitsModel } from '../models/fruits.model';

@Injectable({
  providedIn: 'root'
})
export class ReadingListService {
  
  _ReadingList:FruitsModel[];
  ReadingList:BehaviorSubject<FruitsModel[]>;

  constructor() { 
    this._ReadingList=[];
    this.ReadingList = new BehaviorSubject<FruitsModel[]>([]);
  }

  add(f:FruitsModel):void{
    if(!this._ReadingList.find(ftu => ftu.name === f.name)){
      this._ReadingList= [...this._ReadingList,f];
      this.ReadingList.next(this._ReadingList);
    }
  }
  
  get():BehaviorSubject<FruitsModel[]>{
    return this.ReadingList;
  }
}
