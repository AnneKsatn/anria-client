import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  title: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230" },
  { title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230" },
  { title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230" },
  { title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230" },
  { title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230" },
  { title: "Проверка функционарирования предохранительного выклчателя задних ворот листогибочного пресса TrueBend 5230" },
];

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {


  tasks: any = [
    {
      title: "Автоматизированное обслуживание оборудования. 'Листогибочный пресс TruBend 5230'",
      status: "Выполнено без ошибок",
      start: "25.09.2022 12:00",
      end: "25.09.2022 14:00",
      creator: "Сухова Анна Сергевна",
      reviewer: "Сухова Анна Сергеевна"
    },
    {
      title: "Автоматизированное обслуживание оборудования. 'Токарный станок'",
      status: "Выполнено без ошибок",
      start: "25.09.2022 14:00",
      end: "25.09.2022 15:00",
      creator: "Сухова Анна Сергевна",
      reviewer: "Сухова Анна Сергеевна"
    },
    {
      title: "Автоматизированное обслуживание оборудования. 'Фразерный станок'",
      status: "Выполнено без ошибок",
      start: "25.09.2022 15:00",
      end: "25.09.2022 16:00",
      creator: "Сухова Анна Сергевна",
      reviewer: "Сухова Анна Сергеевна"
    },
    {
      title: "Автоматизированное обслуживание оборудования. 'Шлифовочный станок'",
      status: "Выполнено без ошибок",
      start: "25.09.2022 18:00",
      end: "25.09.2022 19:00",
      creator: "Сухова Анна Сергевна",
      reviewer: "Сухова Анна Сергеевна"
    },
    {
      title: "Автоматизированное обслуживание оборудования. 'Шлифовочный станок'",
      status: "Выполнено без ошибок",
      start: "25.09.2022 15:00",
      end: "25.09.2022 16:00",
      creator: "Сухова Анна Сергевна",
      reviewer: "Сухова Анна Сергеевна"
    }
  ]

  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public router: Router) { }

  ngOnInit(): void {
    this.firestore.collection('/tasks').snapshotChanges().subscribe((data: any) => {
      // this.tasks = data.map(function (item: any) {
      //   return {
      //     "title": item.payload.doc.data().title,
      //     "id": item.payload.doc.id
      //   }
      // })

      // this.tasks = new MatTableDataSource(this.dataR)
    })
  }

  displayedColumns: string[] = ['title'];
  columnsToDisplay: string[] = ['title', 'info', 'edit', 'delete'];
  data: PeriodicElement[] = ELEMENT_DATA;

  addTask() {
  }

  deleteTask(id_element: any) {
    this.firestore.collection("tasks").doc(id_element).delete()
  }

  editTask(task: any) {
    // const dialogRef = this.dialog.open(DialogAddTaskComponent, {
    //   width: '50%',
    //   data: task
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.firestore.collection("tasks").doc(result.id).update(result)
    //   }
    // });
  }

  goToTaskPage(element: any) {
    console.log(element)
    this.router.navigate(["/system/task-info"], { queryParams: { element_id: element.id } })
  }
}
