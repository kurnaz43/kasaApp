import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { File } from '@ionic-native/file/ngx';
@Injectable({
  providedIn: 'root'
})
export class ExporterService {
  isPrinting = false;
  constructor(private router: Router) { }
  async exportToExcel(data, filename) {
    {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, filename);
      XLSX.writeFile(wb, filename + '.xlsx');
    }
  }
  print() {

  }
}
