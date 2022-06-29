import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore'
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddStepComponent } from './dialog-add-step/dialog-add-step.component';

@Component({
  selector: 'app-task-info-page',
  templateUrl: './task-info-page.component.html',
  styleUrls: ['./task-info-page.component.scss']
})
export class TaskInfoPageComponent implements OnInit {

  task_id: any

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  task: any = {
    steps: []
  };
  steps: any
  cars: any;

  getData() {
    this.firestore.collection("tasks").doc(this.task_id).get()
      .subscribe((data: any) => {
        this.task = data.data()
      })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.task_id = params['element_id']
    });

    this.getData()
  }

  orderChanged() {
    this.firestore.collection("tasks").doc(this.task_id).update(this.task)
  }

  addStep() {

    const dialogRef = this.dialog.open(DialogAddStepComponent, {
      width: '50%',
      data: { description: "" }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      this.task.steps = [...this.task.steps, {
        description: result.description
      }];

      this.firestore.collection("tasks").doc(this.task_id).update(
        this.task
      );

    });


    // let number = this.task.steps.length + 1

    // this.task.steps = [...this.task.steps, {
    //   description: "Проверить происходит ли следующее " + number
    // }];

    // this.firestore.collection("tasks").doc(this.task_id).update(
    //   this.task
    // );
  }

  deleteStep(step: any) {

    let index = this.task.steps.indexOf(step)
    this.task.steps.splice(index, 1)

    this.firestore.collection("tasks").doc(this.task_id).update(
      this.task
    );

    this.getData()
  }

  info(step: any) {
    this.router.navigate(["/system/step-info"], { queryParams: { "step": JSON.stringify(step) } })
    // this.router.navigateByUrl("/system/step-info")
    console.log(step)
  }
}

