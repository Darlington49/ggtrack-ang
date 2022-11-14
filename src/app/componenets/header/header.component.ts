import { Component, Directive, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @ViewChild(ProductListComponent) child!:ProductListComponent; 

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    console.log("add button clicked");
    this.dialog.open(AddDialogComponent, {
      // data: {
      //   width:'30%'
      // },
    }).afterClosed().subscribe(val=>{
      this.child.getAllProduct();
    });
  }
}
