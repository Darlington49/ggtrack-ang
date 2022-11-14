import { RestApiService } from 'src/app/services/rest-api.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'productName', 'category', 'freachness', 'price', 'comment', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: RestApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProduct();

  }

  openDialog() {
    console.log("add button clicked");
    this.dialog.open(AddDialogComponent, {
      // data: {
      //   width:'30%'
      // },
    }).afterClosed().subscribe(val => {
      this.getAllProduct();
    });
  }

  getAllProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.log("Products : ", res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => { console.log(err) }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    console.log(row);
    this.dialog.open(AddDialogComponent, {
      //  width: '30%', 
      data: row
    }).afterClosed().subscribe(val => {
      this.getAllProduct();
    })
  }

  deleteProduct(id: number) {
    if (confirm("the product id will be deleted" + id) == true) {


      this.api.deleteProduct(id).subscribe({
        next: (res) => {
          alert("the product id is deleted: " + id);
          this.getAllProduct();

        },
        error: (err) => { alert("Could not delete the product id" + id) },
      })
    }
  }

}
