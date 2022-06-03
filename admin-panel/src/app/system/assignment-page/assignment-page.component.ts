import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


export interface PeriodicElement {
  name: string;
  title: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { title: "Внесение даты", name: 'Касаткина Анна Сергеевна', date: '25 октября' },
];


@Component({
  selector: 'app-assignment-page',
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.scss']
})
export class AssignmentPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  assignments: any = []

  ngOnInit(): void {
    this.firestore.collection("assignments").snapshotChanges().subscribe((data: any) => {
      this.assignments = data.map(function (assignment: any) {
        return {
          "date_end": new Date(assignment.payload.doc.data().date_end).toLocaleString("ru"),
          "date_start": new Date(assignment.payload.doc.data().date_start).toLocaleString("ru"),
          "isCompleted": assignment.payload.doc.data().isCompleted,
          "task_id": assignment.payload.doc.data().task_id,
          "task_title": assignment.payload.doc.data().task_title,
          "worker_id": assignment.payload.doc.data().worker_id,
        }
      })

      this.assignments.forEach((assignment: any) => {
        this.firestore.collection("workers").doc(assignment.worker_id).get().subscribe((data: any) => {
          assignment.worker = data.data().fullname
          console.log(data.data().fullname)
        })
      })
    })
  }

  displayedColumns: string[] = ['task_title', 'worker', 'date_start', 'date_end'];
  columnsToDisplay: string[] = ['task_title', 'worker', 'date_start', 'date_end', 'info']
  data: PeriodicElement[] = ELEMENT_DATA;

  goToTaskPage(element: any) {

  }

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
