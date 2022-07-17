import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css']
})
export class StepPageComponent implements OnInit {

  assignmentId!: string;
  stepId!: string;
  step!: any;
  image_src: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private stepService: StepService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params: any) => {
      this.stepId = params['stepId']
      this.assignmentId = params['assignmentId']

      this.stepService.getStep(this.assignmentId, this.stepId).subscribe((step: any) => {
        this.step = step.data()


        const ref = this.storage.ref(this.step.file);
        ref.getDownloadURL().subscribe((data: any) => {
          this.image_src = data
          console.log(this.image_src)
        })
      })
    })
  }

  completeStep() {
    this.step.status = "completed";
    this.stepService.updateStep(this.assignmentId, this.stepId, this.step).then((data: any) => {
      this.router.navigate(["system/assignment"], { queryParams: { assignment_id: this.assignmentId } })
    })
  }
}
