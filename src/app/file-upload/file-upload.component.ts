import { Component } from '@angular/core';
import { FleetService } from '../fleet.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;
  apiErrors: any = {};

  constructor(private snackBar: MatSnackBar, private fleetService: FleetService, private route: ActivatedRoute, private router: Router) {
  }
   
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Optional: Preview the file (for images)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
  
      this.fleetService.importFleet(formData)
        .pipe(
          catchError(error => {
            this.snackBar.open('File upload failed. Please try again.', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'red-snackbar'
            });
            return throwError(error);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open('File uploaded successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'green-snackbar'
            });
            this.router.navigate(['/auth/fleet']);
          }
        });
    }
  }
  
  goBackToList(): void {
    this.router.navigate(['/auth/fleet']);
  }
}
