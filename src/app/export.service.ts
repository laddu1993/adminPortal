import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToExcel(jsonData: any[], fileName: string): void {
    // Convert JSON to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

    // Create a new workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write the workbook to a file and save it
    //const wbOut: XLSX.Buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const wbOut: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbOut], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  }
}
