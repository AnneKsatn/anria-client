import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {

  workerId!: string;
  tasks!: any;

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params: any) => {

      this.workerId = params['id']

      this.firestore.collection('/assignments', ref => ref.where("worker_id", "==", this.workerId)).snapshotChanges().subscribe((data: any) => {
        this.tasks = data.map(function (assignment: any) {
          return {
            date_start: new Date(assignment.payload.doc.data().date_start),
            date_end: new Date(assignment.payload.doc.data().date_end),
            status: assignment.payload.doc.data().status,
            task_title: assignment.payload.doc.data().task_title,
            worker_id: assignment.payload.doc.data().worker_id,
            worker: {},
            creator_id: assignment.payload.doc.data().creator_id,
            id: assignment.payload.doc.id,
            date_created: new Date(assignment.payload.doc.data().date_created)
          }
        })

        this.tasks.forEach((task: any) => {
          this.firestore.collection("/workers").doc(this.workerId).get().subscribe((data: any) => {
            task.creator = data.data().surname + " " + data.data().name + " " + data.data().patronymic
            this.cd.detectChanges();
          })
        });


        // this.cd.detectChanges();
      })
    })
  }

  addTask() {
  }

  deleteTask(id_element: any) {
    // this.firestore.collection("tasks").doc(id_element).delete()
  }

  editTask(task: any) {
  }

  goToTaskPage(element: any) {
    console.log(element)
    this.router.navigate(["/system/assignment-info"], { queryParams: { id: element.id } })
  }
}
