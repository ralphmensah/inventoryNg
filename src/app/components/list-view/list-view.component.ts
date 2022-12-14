import { Component, ViewChild, OnInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/model/Item.model';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  displayedCols: string[] = ['name', 'date', 'update','quantity', 'price', 'total', 'actions']
  dataSource!: MatTableDataSource<Item>;
  totalNumberOfItems: number = 0;
  totalPriceOfAllItems : number  = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllItems();
    
    
  }

  private getAllItems() {
    return this.api.getAllItems().subscribe(
      {
        next: (res: Item[]) => {
        this.dataSource = new MatTableDataSource(res.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalNumberOfItems = res.length;
        this.totalPriceOfAllItems = res.reduce((x, y)=> x + y.total,0)
        console.log('total price',this.totalPriceOfAllItems);
        console.log(res);
        
        },
        error: () => console.error('error fetching records')
      })
  }

  //apply filter on name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // make Dailog a form component√∑\
  openDialog(): void {
    this.dialog.open(DailogComponent, {
      width: '50rem'
    }).afterClosed().subscribe(val =>{
      console.log(val);
      if(val === 'save'){
        this.getAllItems();
      }
    });
  }

  deleteItem(id:number) {
    this.api.deleteItem(id).subscribe({
      next: ()=>{
        this.getAllItems();
        alert('Item deleted Successfully')
        
      },
      error: ()=>{
        alert('An Error Occured while deleting item')
      }
    })
  }

  editItem(row:any) {
    this.dialog.open(DailogComponent, {
      width:'50rem',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val === 'update'){
        this.getAllItems();
      }})

  }

  sellIem(){
    console.log('sell item');
    
  }

}
