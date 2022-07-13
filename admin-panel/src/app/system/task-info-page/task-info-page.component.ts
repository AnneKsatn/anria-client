import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore'
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';


@Component({
  selector: 'app-task-info-page',
  templateUrl: './task-info-page.component.html',
  styleUrls: ['./task-info-page.component.scss']
})
export class TaskInfoPageComponent implements OnInit {

  taskId: any
  task: any = {
    steps: []
  };

  steps: any = {}

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,
    private taskService: TaskService
  ) { }


  getData() {
    this.firestore.collection("tasks").doc(this.taskId).get()
      .subscribe((data: any) => {
        this.task = data.data()
        this.task.steps_descriptions = {}

        this.task.steps.forEach((element: any) => {
          let step: any;

          this.firestore.collection("/steps").doc(element).get().subscribe((data: any) => {
            step = data.data()
            step.id = element

            this.steps[element] = step
          })
        });
      })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.taskId = params['element_id']
    });

    this.getData()
  }

  orderChanged() {
    this.firestore.collection("tasks").doc(this.taskId).update(this.task)
  }

  addStep() {
    this.router.navigate(["/system/add-step"], { queryParams: { "id": this.taskId } })
  }

  deleteStep(step: any) {

    let index = this.task.steps.indexOf(step)
    this.task.steps.splice(index, 1)

    this.firestore.collection("tasks").doc(this.taskId).update(
      this.task
    );

    this.getData()
  }

  info(step: any) {
    this.router.navigate(["/system/step-info"], { queryParams: { id: step, task_id: this.taskId } })
    // this.router.navigateByUrl("/system/step-info")
    console.log(step)
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).then((data: any) => {
      this.router.navigateByUrl("system/tasks")
    })
  }
}

