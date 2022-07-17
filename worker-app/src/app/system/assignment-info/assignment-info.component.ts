import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-assignment-info',
  templateUrl: './assignment-info.component.html',
  styleUrls: ['./assignment-info.component.css']
})
export class AssignmentInfoComponent implements OnInit {

  assignment_id: any;
  steps: any = [];
  assignment: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,
    private assignmentsService: AssignmentsService,
    private stepService: StepService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.assignment_id = params['assignment_id']
      this.getData()
    });
  }

  getData() {
    this.assignmentsService.getAssignment(this.assignment_id).subscribe((data: any) => {
      this.assignment = data.data()
      console.log(this.assignment)

      // this.assignment.steps.forEach((element: any) => {
      //   this.firestore.collection("steps").doc(element.id).get().subscribe((data: any) => {

      //     let step = data.data()
      //     step.id = element.id

      //     this.steps.push(step)
      //   })
      // });
    })

    this.stepService.getSteps(this.assignment_id).subscribe((data: any) => {
      this.steps = data.map(function (item: any) {
        return {
          "id": item.payload.doc.id,
          "title": item.payload.doc.data().title,
          "status": item.payload.doc.data().status
        }
      })

      console.log(this.steps)
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

  openStep(id: string) {
    this.router.navigate(["system/step"], { queryParams: { stepId: id, assignmentId: this.assignment_id } })
  }
}
