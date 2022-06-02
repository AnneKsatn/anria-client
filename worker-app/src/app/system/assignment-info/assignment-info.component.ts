import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-info',
  templateUrl: './assignment-info.component.html',
  styleUrls: ['./assignment-info.component.css']
})
export class AssignmentInfoComponent implements OnInit {

  assignment_id: any;
  task_id: any;
  steps: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.assignment_id = params['assignment_id']
      this.task_id = params['task_id']
    });

    this.getData()
  }

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  getData() {
    this.firestore.collection("tasks").doc(this.task_id).get().subscribe((data: any) => {
      this.steps = data.data().steps.map(function (step: any) {
        return {
          "description": step.description,
          "completed": false
        }
      })
    })
  }

  completeTask() {
    console.log(this.steps)

    let assignment = {
      "steps": this.steps,
      "isCompleted": true
    }

    this.firestore.collection("assignments").doc(this.assignment_id)
      .update(assignment).then((data: any) => {
        this.router.navigateByUrl("/system/main-page")
      })
  }
}
