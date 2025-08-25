import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FleetService, Fleet } from '../fleet.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  fleets: Fleet[] = [];
  jsonData: any;
  loading = true;
  data: any[] = [];

  displayedColumns: string[] = ['id', 'sku', 'points', 'actions'];
  dataSource = new MatTableDataSource<Fleet>(this.fleets);
  editingRow: Fleet | null = null;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private router: Router, private fleetService: FleetService) { }
  ngOnInit(): void {
    const formData = new FormData();
    formData.append('type', 'commercial');
    formData.append('offset', '0');
    formData.append('limit', '10');

    this.fleetService.getFleets(formData).subscribe({
      next: (data: Fleet[]) => {

        this.jsonData = data;
        this.fleets = this.jsonData.result;
        this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sort.active = 'id';
        this.sort.direction = 'desc';
        this.sort.sortChange.emit(); // Trigger the sorting
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching fleets', error);
        this.loading = false;
      }
    });
  }
  onButtonClick(): void {
    this.router.navigate(['/admin/add']);
  }
  onImportClick(): void {
    this.router.navigate(['/admin/upload']);
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        this.data = jsonData; // Set data to your table data source
      };

      reader.readAsArrayBuffer(file);
    }
  }
  startEdit(row: Fleet) {
    this.editingRow = { ...row };
    
  }

  saveEdit() {
    if (this.editingRow !== null) {
      const index = this.dataSource.data.findIndex(row => row.id === this.editingRow!.id);

      if (index !== -1) {
        console.log("editingRow", this.editingRow);
        this.dataSource.data[index] = this.editingRow!;
        this.dataSource._updateChangeSubscription(); // Update the table view
        this.editingRow = null; // Clear the edit state
      }
    }
  }

  cancelEdit() {
    this.editingRow = null; // Clear the edit state
  }
}

