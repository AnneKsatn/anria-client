import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, ReplaySubject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


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
  report_file: any;

  time_start: Date;

  constructor(
    private sanitizer: DomSanitizer,
    private activatedRouter: ActivatedRoute,
    private stepService: StepService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.time_start = new Date()
  }

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

  fileName: any

  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    this.report_file = file;

    console.log("UPLOADED")

    if (file) {
      // this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
    }

    this.convertFile(event.target.files[0]).subscribe(base64 => {
      console.log(base64)

      this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl(base64)
      // this.step.report_string = base64
      // this.step.report_string = 'data:image/png;base64,' + base64
    });
  }


  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.readAsBinaryString(file);
    // reader.onload = (event) => result.next(btoa(event?.target!.result!.toString()));
    reader.onload = () => result.next(reader.result!.toString())
    return result;
  }

  completeStep() {

    let elapsed_seconds = Math.abs((new Date().getTime() - this.time_start.getTime()) / 1000);

    let report_file_name = "";

    if (this.report_file) {
      report_file_name = '/images' + Math.random() + this.report_file

      const ref = this.storage.ref(report_file_name);
      const task = ref.put(this.report_file);
    }

    this.step.report_file = report_file_name
    this.step.status = "completed";
    this.step.elapsed_seconds = elapsed_seconds


    console.log(this.step)

    this.stepService.updateStep(this.assignmentId, this.stepId, this.step).then((data: any) => {
      this.router.navigate(["system/assignment"], { queryParams: { assignment_id: this.assignmentId } })
    })
  }
}
