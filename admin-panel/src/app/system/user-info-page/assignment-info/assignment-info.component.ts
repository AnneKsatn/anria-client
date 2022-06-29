import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-info',
  templateUrl: './assignment-info.component.html',
  styleUrls: ['./assignment-info.component.scss']
})
export class AssignmentInfoComponent implements OnInit {

  assignment_id!: string;

  assignment: any = {};

  // assignment: any = {
  //   'isCompleted': false
  // }

  task: any;
  worker: any;
  available_tasks: any;


  constructor(
    private activatedRouter: ActivatedRoute,
    private firestore: AngularFirestore,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params: any) => {
      this.assignment_id = params['id']
    })

    // this.firestore.collection("tasks").snapshotChanges().subscribe((data: any) => {
    //   this.available_tasks = data.map(function (task: any) {
    //     return {
    //       "id": task.payload.doc.id,
    //       "title": task.payload.doc.data().title,
    //       "steps": task.payload.doc.data().steps
    //     }
    //   })

    //   console.log(this.available_tasks)
    // })

    this.firestore.collection("assignments").doc(this.assignment_id).get().subscribe((data: any) => {
      this.assignment = data.data()
      this.assignment.date_start = new Date(this.assignment.date_start)
      this.assignment.date_end = new Date(this.assignment.date_end)

      // this.assignment.task = {
      //   title: this.assignment.task_title,
      //   id: "ZkD4NaK4ixBcsXjmh4mW",
      //   steps: this.assignment.steps
      // }

      console.log(this.assignment)
      this.cd.detectChanges()
    })
  }


  assignTask() {

    // this.assignment.task_id = this.task.id
    // this.assignment.task_title = this.task.title
    // this.assignment.steps = this.task.steps

    this.assignment.date_start = new Date(this.assignment.date_start).toISOString()
    this.assignment.date_end = new Date(this.assignment.date_end).toISOString()

    var context = this
    this.firestore.collection("assignments").doc(this.assignment_id).update(this.assignment)
      .then(function (docRef) {
        context.router.navigate(["/system/user-info", context.assignment.worker_id, "calendar"])
      })
  }

  deleteTask() {

    let context = this;

    this.firestore.collection("assignments").doc(this.assignment_id).delete().then((data: any) => {
      context.router.navigate(["/system/user-info", context.assignment.worker_id, "calendar"])
    })
  }
}
