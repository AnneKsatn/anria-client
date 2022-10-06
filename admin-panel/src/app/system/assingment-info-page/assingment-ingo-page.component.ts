import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/shared/services/assignment.service';
import { StepService } from 'src/app/shared/services/step.service';
import { jsPDF } from "jspdf";
import { font } from "./font";

@Component({
  selector: 'app-assingment-ingo-page',
  templateUrl: './assingment-ingo-page.component.html',
  styleUrls: ['./assingment-ingo-page.component.scss']
})
export class AssingmentIngoPageComponent implements OnInit {

  id!: string;
  assignment!: {
    date_start: Date,
    date_end: Date,
    worker_name: string,
    initiator: string,
    steps: Array<any>,
    task_title: string,
    status: string,
    isCompleted: boolean
  };
  steps?: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private stepService: StepService,
    private router: Router,
    private storage: AngularFireStorage,

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

        this.assignment.steps.forEach((step: any) => {
          this.stepService.getAssignStepById(step.id, params['id']).subscribe((data: any) => {
            let step = data.data()
            console.log(step)

            console.log(step.report_file)

            if (step.report_file) {
              const ref = this.storage.ref(step.report_file);
              ref.getDownloadURL().subscribe((img: any) => {
                step.report_file = img
                this.steps.push(step)
              })
            }

            if (!step.report_file) {
              this.steps.push(step)
            }
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

  toDataURL(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  createReport() {
    let doc = new jsPDF('p', 'pt', 'a4');

    doc.addFileToVFS("OpenSans-Regular.ttf", font)
    doc.addFont("OpenSans-Regular.ttf", "OpenSans", "normal");
    doc.setFont("OpenSans", "normal");

    let x = 15, y = 40;
    let width = 300, height = 180;

    doc.text(this.assignment.task_title, x, y)
    y = y + 40;

    this.steps.forEach((step: any) => {
      if (step.report_string) {

        doc.text(step.title, x, y)
        y = y + 40;

        doc.addImage(step.report_string, 'PNG', x, y, width, height)
        y = y + height + 20;
      }
    })

    doc.save("customFonts.pdf");
  }
}
