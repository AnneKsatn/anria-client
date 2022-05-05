import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


export interface PeriodicElement {
  name: string;
  title: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: "Внесение даты",  name: 'Касаткина Анна Сергеевна', date: '25 октября'},
];


@Component({
  selector: 'app-assignment-page',
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.scss']
})
export class AssignmentPageComponent implements OnInit {

 
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['title', 'name', 'date'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;

  addWorker() {
    // const dialogRef = this.dialog.open(DialogAddWorkerComponent, {
    //     width: '30%',
    //     // maxWidth: '100vw',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}
