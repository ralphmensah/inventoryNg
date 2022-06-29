import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dummyData } from '../model/dummyData';
import { Item } from '../model/Item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items = [...dummyData];
  constructor() {}

  get totalItems():Observable<number> {
    return new Observable((observer)=>{
      observer.next(this.items.length)
    })
  }

  addItem(item:Item){
    this.items.push(item)
    console.log(this.items);
    
  }
}
