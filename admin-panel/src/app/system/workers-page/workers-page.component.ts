import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddWorkerComponent } from './dialog-add-worker/dialog-add-worker.component';


export interface PeriodicElement {
  name: string;
  phone: number;
  position: string;
  department: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
  {phone: 89215673714, name: 'Касаткина Анна Сергеевна', position: "Web - программист", department: 'RnD'},
];

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {

  

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'phone', 'position', 'department'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;

  addWorker() {
    const dialogRef = this.dialog.open(DialogAddWorkerComponent, {
        width: '30%',
        // maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

// @Component({
//   selector: 'add-worker-dialog',
//   templateUrl: 'add-worker-dialog.html',
// })
// export class AddWorkerDialog {}