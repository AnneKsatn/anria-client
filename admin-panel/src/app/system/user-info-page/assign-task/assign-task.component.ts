import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';

export interface DialogData {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  department: string;
  position: string;

  date_start: Date;
  date_end: Date;
  task: any
}

interface Animal {
  name: string;
  sound: string;
}

interface Food {
  value: string;
  viewValue: string;
}


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
  data: any = {};
  categories = [];

  worker: any;

  selectedCity1: any;

  selectedValue: string = "";
  selectedCar: string = "";

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  tasks: any = []
  s1: any

  ngOnInit(): void {

    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.assignment.worker_id = params['id']
    })

    this.firestore.collection("tasks").snapshotChanges().subscribe((data: any) => {
      this.tasks = data.map(function (task: any) {
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

    console.log(this.task)

    this.assignment.task_id = this.task.id
    this.assignment.task_title = this.task.title
    this.assignment.steps = this.task.steps

    var context = this
    this.firestore.collection("assignments").add(this.assignment)
      .then(function (docRef) {
        context.router.navigate(["/system/user-info", context.assignment.worker_id, "calendar"])
      })
  }
}
