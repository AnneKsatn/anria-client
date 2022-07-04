import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assingments-page',
  templateUrl: './assingments-page.component.html',
  styleUrls: ['./assingments-page.component.scss']
})
export class AssingmentsPageComponent implements OnInit {

  tasks: any = [
    {
      user: "Касаткина Мария Сергеевна",
      title: "Автоматизированное обслуживание оборудования. 'Листогибочный пресс TruBend 5230'",
      status: "Выполнено без ошибок",
      start: "25.09.2022 12:00",
      end: "25.09.2022 14:00",
      creator: "Сухова Анна Сергевна",
      reviewer: "Сухова Анна Сергеевна"
    }
  ]

  constructor(
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
