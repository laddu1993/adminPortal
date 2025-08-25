import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from '../fleet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  fleet: any = {};
  form: FormGroup;
  apiErrors: any = {};

  constructor(private fb: FormBuilder, private fleetService: FleetService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      sku: [
        '', [
          Validators.required, // Field is required
          Validators.pattern('^[0-9]*$'), // Pattern to allow only numbers,
          Validators.minLength(9)
        ]
      ],
      points: [
        '', [
          Validators.required, // Field is required
          Validators.pattern('^[0-9]*$'), // Pattern to allow only numbers
          Validators.minLength(1)
        ]],
    });
  }

  ngOnInit(): void {
    //const id = this.route.snapshot.paramMap.get('id');
    // Fetch the item based on id from API or service
  }

  onSubmit(): void {
    if (this.form.valid) {      
      const formData = new FormData();
      formData.append('type', 'commercial');
      formData.append('sku', this.form.value.sku);
      formData.append('points', this.form.value.points);
      // Save changes to API or service
      this.fleetService.addFleet(formData)
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
          this.router.navigate(['/admin/list']);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  clearForm() {
    this.form.reset({
      sku: '',
      points: ''
    });
  }
  goBackToList(): void {
    this.router.navigate(['/admin/list']);
  }
  onImport() {
    // Logic for import action
    console.log('Import clicked');
  }

  onExport() {
    // Logic for export action
    console.log('Export clicked');
  }
}
