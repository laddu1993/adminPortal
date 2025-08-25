import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from '../fleet.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  fleetId: number | null = null;
  apiErrors: any = {};

  constructor(private fleetService: FleetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fleetId = +this.route.snapshot.paramMap.get('id')!;
  }

  onDelete(): void {
    if (this.fleetId !== null) {
      // Call service to delete item
      const formData = new FormData();
      formData.append('id', this.fleetId.toString());
      this.fleetService.deleteFleet(formData)
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
            this.router.navigate(['/list']);
          }
        });
      this.router.navigate(['/list']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/list']);
  }
}
