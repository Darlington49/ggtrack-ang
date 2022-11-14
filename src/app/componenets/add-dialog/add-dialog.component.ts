import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RestApiService } from 'src/app/services/rest-api.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  favoriteSeason: string = "";
  checked = false;
  categories: Categories[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  productForm !: FormGroup;
  actionBtn: String = "Save"
  constructor(
    private formBuilder: FormBuilder,
    private api: RestApiService,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freachness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = "Update"
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freachness'].setValue(this.editData.freachness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.productForm.controls['date'].setValue(this.editData.date)
    }
  }
  addProduct() {

    if (!this.editData) {
      console.log("Add product", this.productForm.value);
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert("Product added succesuflly");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => { alert("Eroor while adding the product") },
        },
        );
      }
      else {
        alert("Eroor while adding the product")
      }
    }
    else {
      console.log("Update product", this.productForm.value);
      this.UpdateProduct(this.productForm.value, this.editData.id)
    }

  }
  UpdateProduct(data: any, id: number) {
    console.log(data, id);
    this.api.putProduct(data, id).subscribe({
      next: (res) => {
        alert("Product Updated Successfully")
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert("Product not Updated")

      }
    });
  }
}
