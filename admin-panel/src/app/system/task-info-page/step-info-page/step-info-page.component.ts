import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-step-info-page',
  templateUrl: './step-info-page.component.html',
  styleUrls: ['./step-info-page.component.scss']
})
export class StepInfoPageComponent implements OnInit {

  step_id!: string;
  step!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stepService: StepService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.step_id = params["id"]

      this.stepService.getStepById(this.step_id).subscribe((data: any) => {
        this.step = data.data()
        console.log(this.step)
      })
    })
  }
}
