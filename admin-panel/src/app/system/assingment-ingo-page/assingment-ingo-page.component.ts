import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/shared/services/assignment.service';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-assingment-ingo-page',
  templateUrl: './assingment-ingo-page.component.html',
  styleUrls: ['./assingment-ingo-page.component.scss']
})
export class AssingmentIngoPageComponent implements OnInit {

  id!: string;
  assignment?: any;
  steps?: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private stepService: StepService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.id = params['id']

      this.assignmentService.getAssignmentById(params['id']).subscribe((data: any) => {
        this.assignment = data.data()

        this.assignment.date_start = new Date(this.assignment.date_start)
        this.assignment.date_end = new Date(this.assignment.date_end)

        this.assignment.worker_name = "Сухова Мария Сергеевна"
        this.assignment.initiator = "Касаткина Анна Сергеевна"

        console.log(this.assignment)

        this.assignment.steps.forEach((step: any) => {
          this.stepService.getStepById(step).subscribe((data: any) => {
            step = data.data()
            this.steps.push(data.data())
            console.log(this.steps)
          })
        });
      })
    })
  }

  deleteAssignment() {
    this.assignmentService.deleteAssignment(this.id).then((data: any) => {
      this.router.navigateByUrl("system/assignments")
    })
  }
}
