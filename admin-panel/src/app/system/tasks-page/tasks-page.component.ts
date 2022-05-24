import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select/select';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { Router } from '@angular/router';

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

  dataR: any = []

  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public router: Router) { }

  ngOnInit(): void {
    this.firestore.collection('/tasks').snapshotChanges().subscribe((data: any) => {
      this.dataR = data.map(function(item: any){
        return {
          "title": item.payload.doc.data().title,
          "id": item.payload.doc.id
        }
      })

      this.dataR = new MatTableDataSource(this.dataR)

      console.log(this.dataR)
    })
  }

  displayedColumns: string[] = ['title'];
  columnsToDisplay: string[] = ['title', 'info', 'edit', 'delete'];
  data: PeriodicElement[] = ELEMENT_DATA;

  addTask() {

    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '50%',
      data: {title: ""}
    });

    

    dialogRef.afterClosed().subscribe(result => {
      result.steps = []

      this.firestore.collection("tasks").add(result)
      .then(function (docRef) {
        console.log(docRef.id);
      })
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataR.filter = filterValue.trim().toLowerCase();
  }

  deleteTask(id_element: any) {
    this.firestore.collection("tasks").doc(id_element).delete()
  }

  editTask(task: any) {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '50%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firestore.collection("tasks").doc(result.id).update(result)
      }
    });
  }

  goToTaskPage(element: any) {
    console.log(element)
    this.router.navigate(["/system/task-info"],  {queryParams: {element_id: element.id}})
  }
}
