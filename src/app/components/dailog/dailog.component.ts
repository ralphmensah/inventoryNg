import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';


@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit {
  actionBtn: string ='Save';



  constructor(private api: ApiService, public form:FormService,
    @Inject(MAT_DIALOG_DATA)public editData:{id:number, name:string,date:string,quantity: number, price:number,total:number},
    public dialogRef: MatDialogRef<DailogComponent>) { 
    console.log(this.form.price);
    
  }

  get total():number{
    const quantity:number =this.form.quantity?.value;
    const price:number =  this.form.price?.value;
    return price * quantity;
  }

  onSubmit(){
    if(!this.editData){
      if(this.form.itemForm.valid){
        const date = new Date().toString()
  
        let itemObj = {
            name: this.form.name!.value,
            date: date,
            update: '',
            quantity: this.form.quantity?.value,
            price: this.form.price?.value,
            total: this.total
          };
  
        this.api.addItem(itemObj).subscribe({
          next: () => {alert('Item Added Successfully');
          this.form.itemForm.reset();
          this.dialogRef.close('save');
        },
          error: ()=> alert('Error While Adding Item')
        });
      }
      console.log(this.form.itemForm.value);
    }else{
      this.updateItem()
    }
  }
  
  updateItem() {
    const updated_date = new Date().toString()
      let itemObj = {
        name: this.form.name!.value,
        date: this.editData.date,
        update: updated_date,
        quantity: this.form.quantity?.value,
        price: this.form.price?.value,
        total: this.total
      };
    this.api.updateItem(itemObj, this.editData.id).subscribe({
      next: () => {alert('Item Updated Successfully');
      this.form.itemForm.reset();
      this.dialogRef.close('update');
    },
      error: ()=> alert('Error While Updating Item')
    })
  }

  ngOnInit() {
    this.form.itemForm.reset()
    console.log(this.editData);
    if(this.editData){
      this.actionBtn = 'Update'
      this.form.itemForm.controls['name'].setValue(this.editData.name)
      this.form.itemForm.controls['quantity'].setValue(this.editData.quantity)
      this.form.itemForm.controls['price'].setValue(this.editData.price)
    }
    
  }

}
