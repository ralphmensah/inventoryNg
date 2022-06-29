import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ItemService } from './services/Item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  totalNumberOfItems = this.itemService.totalItems;
  constructor(private itemService:ItemService){}
}
