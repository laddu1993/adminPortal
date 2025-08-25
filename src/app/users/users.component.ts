import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  data: any[] = [];
  jsonData: any;
  constructor(private snackBar: MatSnackBar, private dataService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getAll().subscribe(res => {
      this.jsonData = res;
      this.data = this.jsonData.result;
    });
  }

  openDialog(item?: any): void {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      width: '400px',
      data: item || {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Check if the user is being updated or added based on the presence of 'id'
        if (result.id) {
          this.dataService.update(result).subscribe(response => {
            // Handle update response
            if (response.status) {
              this.snackBar.open(`User Updated Successfully!`, 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'green-snackbar'
              });
              this.loadData(); // Reload data after successful update
            } else {
              this.snackBar.open(response.message || 'Error updating user', 'Close', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'red-snackbar'
              });
            }
          }, error => {
            // Handle update error
            this.snackBar.open('An error occurred while updating the user.', 'Close', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'red-snackbar'
            });
          });
        } else {
          this.dataService.add(result).subscribe(response => {
            // Check response status to determine snackbar message
            if (response.status) {
              // Show green snackbar if status is true
              this.snackBar.open(`User Added Successfully!`, 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'green-snackbar'
              });
              this.loadData(); // Load data after successful addition
            } else {
              // Show red snackbar if status is false
              this.snackBar.open(response.message || 'Email already exists', 'Close', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'red-snackbar'
              });
            }
          }, error => {
            // Handle error if needed
            this.snackBar.open('An error occurred while adding the user.', 'Close', {
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
    this.dataService.delete(id).subscribe(
      response => {
        // Check if the response indicates success
        if (response.status) {
          this.loadData(); // Reload data after successful deletion
          // Show success message
          this.snackBar.open('User Deleted Successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'green-snackbar'
          });
        } else {
          // Show error message if status is false
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

  activateUser(id: number): void {    
    this.dataService.activate(id, 1).subscribe(() => {
      this.loadData(); // Refresh the user list
    });
  }

  deactivateUser(id: number): void {
    this.dataService.activate(id, 0).subscribe(() => {
      this.loadData(); // Refresh the user list
    });
  }
}
