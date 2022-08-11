import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  tasks: Task[] = []

  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data.map(function (item: any) {
        return {
          "title": item.payload.doc.data().title,
          "id": item.payload.doc.id
        }
      })
    })
  }

  addTask() {

    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '50%',
      data: { title: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.steps = []

        this.taskService.addTask(result)
      }
    });
  }

  goToTaskPage(element: any) {
    console.log(element)
    this.router.navigate(["/system/task-info"], { queryParams: { element_id: element.id } })
  }
}
