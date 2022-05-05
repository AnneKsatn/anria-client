import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

export interface PeriodicElement {
  title: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230"},
  {title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230"},
  {title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230"},
  {title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230"},
  {title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230"},
  {title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230"},
];


@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['title'];
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
