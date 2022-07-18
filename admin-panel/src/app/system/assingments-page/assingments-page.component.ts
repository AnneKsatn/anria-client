import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assingments-page',
  templateUrl: './assingments-page.component.html',
  styleUrls: ['./assingments-page.component.scss']
})
export class AssingmentsPageComponent implements OnInit {

  tasks: any = [
    // {
    //   user: "Касаткина Мария Сергеевна",
    //   title: "Автоматизированное обслуживание оборудования. 'Листогибочный пресс TruBend 5230'",
    //   status: "Выполнено без ошибок",
    //   start: "25.09.2022 12:00",
    //   end: "25.09.2022 14:00",
    //   creator: "Сухова Анна Сергевна",
    //   reviewer: "Сухова Анна Сергеевна"
    // }
  ]

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
  ) { }

  ngOnInit(): void {

    this.firestore.collection('/assignments').snapshotChanges().subscribe((data: any) => {
      this.tasks = data.map(function (assignment: any) {
        return {
          date_start: new Date(assignment.payload.doc.data().date_start),
          date_end: new Date(assignment.payload.doc.data().date_end),
          status: assignment.payload.doc.data().isCompleted,
          task_title: assignment.payload.doc.data().task_title,
          worker_id: assignment.payload.doc.data().worker_id,
          worker: {},
          initiator: "Касаткина Анна Сергеевна",
          id: assignment.payload.doc.id
        }
      })

      this.tasks.forEach((element: any) => {
        this.firestore.collection("workers").doc(element.worker_id).get().subscribe(data => {
          element.worker = data.data()
        })
      });
    })

  }

  addTask() {

  }

  goToTaskPage(element: any) {
    console.log(element)
    this.router.navigate(["/system/assignment-info"], { queryParams: { id: element.id } })
  }
}
