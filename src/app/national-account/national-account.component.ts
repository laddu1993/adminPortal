import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface ExistingCust {
  fleet_id: number;
  national_account_name: string;
}

@Component({
  selector: 'app-national-account',
  templateUrl: './national-account.component.html',
  styleUrls: ['./national-account.component.scss']
})
export class NationalAccountComponent implements OnInit {
  data: any[] = [];
  jsonData: any;
  displayedColumns: string[] = ['id', 'national_account_name', 'territory', 'actions']; // Added Territory column
  dataSource = new MatTableDataSource<ExistingCust>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // ✅ Add sorting
  constructor(private snackBar: MatSnackBar, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.dataService.getAll().subscribe((res: any) => {
      if (res?.status && Array.isArray(res.result)) {
        this.dataSource.data = res.result.map((item: any) => ({
          id: item.id,
          national_account_name: item.national_account_name,
          fleet_id: item.fleet_id, // ✅ Include fleet_id since it's required in ExistingCust
          territory: item.flag_type === 'DIS27' ? 'Tree' : item.flag_type === 'DIS25' ? 'Landscape' : 'Unknown' // Mapping flag_type to territory
        })) as ExistingCust[];
        
        this.dataSource.paginator = this.paginator; // Assign paginator after data is set
        this.dataSource.sort = this.sort; // ✅ Ensure sorting is applied after data loads
      }
    });
  }

  openDialog(item?: any): void {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '450px',
      data: item || {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Update existing item
          this.dataService.update(result).subscribe(
            response => {
              if (response.status) {
                this.loadData(); // Reload data after successful update
                // Show success message
                this.snackBar.open('Item Updated Successfully!', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'green-snackbar'
                });
              } else {
                // Show error message if update fails
                this.snackBar.open(response.message || 'Failed to update item.', 'Close', {
                  duration: 5000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'red-snackbar'
                });
              }
            },
            error => {
              // Handle error case (e.g., network issues)
              this.snackBar.open('An error occurred while updating the item.', 'Close', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'red-snackbar'
              });
            }
          );
        } else {
          // Add new item
          this.dataService.add(result).subscribe(
            response => {
              if (response.status) {
                this.loadData(); // Reload data after successful addition
                // Show success message
                this.snackBar.open('Item Added Successfully!', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'green-snackbar'
                });
              } else {
                // Show error message if addition fails
                this.snackBar.open(response.message || 'Failed to add item.', 'Close', {
                  duration: 5000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'red-snackbar'
                });
              }
            },
            error => {
              // Handle error case (e.g., network issues)
              this.snackBar.open('An error occurred while adding the item.', 'Close', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'red-snackbar'
              });
            }
          );
        }
      }
    });
  }  

  delete(id: number): void {
    this.dataService.delete(id).subscribe(
      response => {
        // Show success message if delete was successful
        if (response.status) {
          this.loadData(); // Reload data after successful deletion
          this.snackBar.open('Item Deleted Successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          });
        } else {
          // Show error message if deletion fails
          this.snackBar.open(response.message || 'Failed to delete item.', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          });
        }
      },
      error => {
        // Handle error case (e.g., network issues)
        this.snackBar.open('An error occurred while deleting the item.', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'red-snackbar'
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }  
    
}
