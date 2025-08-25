import { Component } from '@angular/core';
import { AccessoriesService } from '../accessories.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accessories-import',
  templateUrl: './accessories-import.component.html',
  styleUrls: ['./accessories-import.component.scss']
})
export class AccessoriesImportComponent {
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;
  apiErrors: any = {};

  constructor(private accessoriesService: AccessoriesService, private route: ActivatedRoute, private router: Router) {
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
      
      // Replace with your upload URL
      // Example: this.http.post('your-upload-url', formData).subscribe(response => { ... });
      console.log('File ready for upload:', this.selectedFile);
      this.accessoriesService.importAccessories(formData)
      .pipe(
        catchError(error => {
          console.log('error' + error)
          // Handle the error and update the form errors
          this.apiErrors = error.errors; // Adjust based on API response
          return throwError(error);
        })
      )
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/auth/accessories']);
        }
      });
    }
  }
  goBackToList(): void {
    this.router.navigate(['/auth/accessories']);
  }
}
