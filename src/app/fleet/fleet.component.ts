import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FleetService, Fleet } from '../fleet.service';
import { AddEditFleetDialogComponent } from '../add-edit-fleet-dialog/add-edit-fleet-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExportService } from '../export.service';
import { LoaderService } from 'src/app/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  fleets: Fleet[] = [];
  data: any[] = [];
  jsonData: any;
  loading = true;
  dataSource = new MatTableDataSource<Fleet>(this.fleets);
  editingRow: Fleet | null = null;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private snackBar: MatSnackBar, private loaderService: LoaderService, private exportService: ExportService, private router: Router, private dataService: FleetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loaderService.show();
    const formData = new FormData();
    formData.append('type', 'commercial');
    formData.append('offset', '0');
    formData.append('limit', '10');
    this.dataService.getFleets(formData).subscribe(res => {
      this.jsonData = res;
      this.data = this.jsonData.result;
      this.fleets = this.jsonData.result;
      this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
      this.loading = false;
      this.loaderService.hide();
    });
  }

  openDialog(item?: any): void {
    const dialogRef = this.dialog.open(AddEditFleetDialogComponent, {
      width: '450px',
      data: item || {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.dataService.update(result).subscribe(
            response => {
              // Show success message if update was successful
              if (response.status) {
                this.loadData(); // Reload data after successful update
                this.snackBar.open('Fleet Updated Successfully!', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'green-snackbar'
                });
              } else {
                // Show error message if update fails
                this.snackBar.open(response.message || 'Failed to update fleet.', 'Close', {
                  duration: 5000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'red-snackbar'
                });
              }
            },
            error => {
              // Handle error case (e.g., network issues)
              this.snackBar.open('An error occurred while updating the fleet.', 'Close', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'red-snackbar'
              });
            }
          );
        } else {
          this.dataService.addFleet(result).subscribe(
            response => {
              this.jsonData = response;
              // Show success message if addition was successful
              if (this.jsonData.status) {
                this.loadData(); // Reload data after successful addition
                this.snackBar.open('Fleet Added Successfully!', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'green-snackbar'
                });
              } else {
                // Show error message if addition fails
                this.snackBar.open(this.jsonData.message || 'Failed to add fleet.', 'Close', {
                  duration: 5000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: 'red-snackbar'
                });
              }
            },
            error => {
              // Handle error case (e.g., network issues)
              this.snackBar.open('An error occurred while adding the fleet.', 'Close', {
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
    this.dataService.deleteFleet(id).subscribe(
      response => {
        this.jsonData = response;
        // Check the response status to determine the snackbar message
        if (this.jsonData.status) {
          this.loadData(); // Reload data after successful deletion
          this.snackBar.open('Fleet Deleted Successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'green-snackbar'
          });
        } else {
          // Show error message if deletion fails
          this.snackBar.open(this.jsonData.message || 'Failed to delete fleet.', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'red-snackbar'
          });
        }
      },
      error => {
        // Handle error if needed (e.g., network issues)
        this.snackBar.open('An error occurred while deleting the fleet.', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'red-snackbar'
        });
      }
    );
  }

  onImportClick(): void {
    this.router.navigate(['/auth/fleet/import']);
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
    this.exportService.exportToExcel(jsonData, 'fleet-points-export');
  }
}

