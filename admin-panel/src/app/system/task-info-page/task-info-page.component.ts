import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore'
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import { DocumentSnapshot } from 'firebase/firestore';
import { Task } from 'src/app/shared/models/task.model';
import { StepService } from 'src/app/shared/services/step.service';
import { Step } from 'src/app/shared/models/step.model';


@Component({
  selector: 'app-task-info-page',
  templateUrl: './task-info-page.component.html',
  styleUrls: ['./task-info-page.component.scss']
})
export class TaskInfoPageComponent implements OnInit {

  taskId: any
  task!: Task

  steps: any = {}

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private stepService: StepService
  ) { }


  getData() {

    this.taskService.getTaskByID(this.taskId).subscribe((data: DocumentSnapshot<Task>) => {
      this.task = data.data()!

      this.task?.steps.forEach((stepId: string) => {

        let step: any;

        this.stepService.getStepById(stepId).subscribe((data: DocumentSnapshot<Step>) => {
          step = data.data()

          step.id = stepId
          this.steps[stepId] = step
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
    this.taskService.updateTask(this.taskId, this.task)
  }

  addStep() {
    this.router.navigate(["/system/add-step"], { queryParams: { "id": this.taskId } })
  }

  deleteStep(step: any) {

    let index = this.task.steps.indexOf(step)
    this.task.steps.splice(index, 1)

    this.taskService.updateTask(this.taskId, this.task)

    this.getData()
  }

  info(step: any) {
    this.router.navigate(["/system/step-info"], { queryParams: { id: step, task_id: this.taskId } })
    console.log(step)
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).then((data: any) => {
      this.router.navigateByUrl("system/tasks")
    })
  }
}

