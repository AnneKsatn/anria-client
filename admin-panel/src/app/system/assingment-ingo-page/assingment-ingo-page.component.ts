import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/shared/services/assignment.service';

@Component({
  selector: 'app-assingment-ingo-page',
  templateUrl: './assingment-ingo-page.component.html',
  styleUrls: ['./assingment-ingo-page.component.scss']
})
export class AssingmentIngoPageComponent implements OnInit {

  id!: string;
  assignment?: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
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
      })
    })
  }

  deleteAssignment() {
    this.assignmentService.deleteAssignment(this.id).then((data: any) => {
      this.router.navigateByUrl("system/assignments")
    })
  }
}
