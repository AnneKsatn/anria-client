import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {

  assignment: any = {
    'isCompleted': false
  }

  task: any;
  worker: any;
  available_tasks: any;


  ngOnInit(): void {

    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.assignment.worker_id = params['id']
    })

    this.firestore.collection("tasks").snapshotChanges().subscribe((data: any) => {
      this.available_tasks = data.map(function (task: any) {
        return {
          "id": task.payload.doc.id,
          "title": task.payload.doc.data().title,
          "steps": task.payload.doc.data().steps
        }
      })
    })
  }

  constructor(
    public firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  assignTask() {

    this.assignment.task_id = this.task.id
    this.assignment.task_title = this.task.title
    this.assignment.steps = this.task.steps

    this.assignment.date_start = new Date(this.assignment.date_start).toISOString()
    this.assignment.date_end = new Date(this.assignment.date_end).toISOString()

    var context = this
    this.firestore.collection("assignments").add(this.assignment)
      .then(function (docRef) {
        context.task.steps.forEach((item: any) => {
          context.firestore.collection("steps").doc(item).get().subscribe((step_db: any) => {

            let step = step_db.data()
            step.status = "not_started"
            console.log(step)
            context.firestore.collection("assignments/" + docRef.id + "/steps").doc(item).set(
              step
            )
          })
        })
        context.router.navigate(["/system/user-info", context.assignment.worker_id, "calendar"])
      })
  }
}
