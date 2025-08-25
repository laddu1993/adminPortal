import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccessoriesService, Accessories } from '../accessories.service';
import { AddEditAccessoriesDialogComponent } from '../add-edit-accessories-dialog/add-edit-accessories-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExportService } from '../export.service';
import { LoaderService } from 'src/app/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent {
  accessories: Accessories[] = [];
  data: any[] = [];
  jsonData: any;
  loading = true;
  dataSource = new MatTableDataSource<Accessories>(this.accessories);
  editingRow: Accessories | null = null;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private snackBar: MatSnackBar, private loaderService: LoaderService, private exportService: ExportService, private router: Router, private dataService: AccessoriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loaderService.show();
    const formData = new FormData();
    formData.append('type', 'commercial');
    formData.append('offset', '0');
    formData.append('limit', '10');
    this.dataService.getAccessories(formData).subscribe(res => {
      this.jsonData = res;
      this.data = this.jsonData.result;
      this.accessories = this.jsonData.result;
      this.dataSource = new MatTableDataSource<Accessories>(this.accessories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
      this.loading = false;
      this.loaderService.hide();
    });
  }

  openDialog(item?: any): void {
    const dialogRef = this.dialog.open(AddEditAccessoriesDialogComponent, {
      width: '450px',
      data: item || {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Update existing accessory
          this.dataService.update(result).subscribe(response => {
            if (response.status) {
              // Show success message for update
              this.snackBar.open('Accessory Updated Successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'green-snackbar'
              });
              this.loadData(); // Reload data after successful update
            } else {
              // Show error message if status is false
              this.snackBar.open(response.message || 'Failed to update accessory.', 'Close', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'red-snackbar'
              });
            }
          }, error => {
            // Handle error if needed
            this.snackBar.open('An error occurred while updating the accessory.', 'Close', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'red-snackbar'
            });
          });
        } else {
          // Add new accessory
          this.dataService.addAccessories(result).subscribe(response => {
            this.jsonData = response;
            if (this.jsonData.status) {
              // Show success message for addition
              this.snackBar.open('Accessory Added Successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'green-snackbar'
              });
              this.loadData(); // Reload data after successful addition
            } else {
              // Show error message if status is false
              this.snackBar.open(this.jsonData.message || 'Failed to add accessory.', 'Close', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'red-snackbar'
              });
            }
          }, error => {
            // Handle error if needed
            this.snackBar.open('An error occurred while adding the accessory.', 'Close', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'red-snackbar'
            });
          });
        }
      }
    });
  }  

  delete(id: number): void {
    this.dataService.deleteAccessories(id).subscribe(
      response => {
        this.jsonData = response;
        // Check if the response indicates success
        if (this.jsonData.status) {
          this.loadData(); // Reload data after successful deletion
          // Show success message
          this.snackBar.open('Accessory Deleted Successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'green-snackbar'
          });
        } else {
          // Show error message if status is false
          this.snackBar.open(this.jsonData.message || 'Failed to delete accessory.', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          });
        }
      },
      error => {
        // Handle error case (e.g., network issues)
        this.snackBar.open('An error occurred while deleting the accessory.', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'red-snackbar'
        });
      }
    );
  }

  onImportClick(): void {
    this.router.navigate(['/auth/accessories/import']);
  }
  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement | null;; // Type assertion
    if (input) {
      this.dataSource.filter = input.value.trim().toLowerCase();
    }
  }
  exportToExcel(): void {
    // Get the data from the dataSource and convert it to JSON
    const jsonData = this.dataSource.data;
    
    // Call the export service to export data
    this.exportService.exportToExcel(jsonData, 'accessories-export');
  }
}
