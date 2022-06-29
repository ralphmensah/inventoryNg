import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  itemForm = this.fb.group({
    name: ['', Validators.required],
    quantity: ['1', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required, Validators.pattern(/\d*/)]],
  });

  constructor(private fb: FormBuilder) {}

  get name(){
    return this.itemForm.get('name');
  }

  get quantity(){
    return this.itemForm.get('quantity');
  }

  get price(){
    return this.itemForm.get('price');
  }
}
