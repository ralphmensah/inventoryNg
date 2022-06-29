import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from '../model/Item.model';

const BASEURL = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http:HttpClient) { }

getAllItems():Observable<Item[]>{
return this.http.get<Item[]>(`${BASEURL}/items`);
}

getTotalNumberofItems():Observable<number>{
  return this.getAllItems().pipe(map((res)=> res.length));
}

addItem(data:Item){
  return this.http.post<Item>(`${BASEURL}/items/`,data)
}

updateItem(data:Item,id:number){
return this.http.put<Item>(`${BASEURL}/items/${id}`,data)
}

deleteItem(id:number){
  return this.http.delete<Item>(`${BASEURL}/items/${id}`)
  }
}
