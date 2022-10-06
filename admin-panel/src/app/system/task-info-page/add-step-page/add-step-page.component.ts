import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';


@Component({
  selector: 'app-add-step-page',
  templateUrl: './add-step-page.component.html',
  styleUrls: ['./add-step-page.component.scss']
})
export class AddStepPageComponent implements OnInit {

  form!: FormGroup;
  task_id!: string;
  task!: any;
  file: any;

  get checklist() {
    return this.form?.get('checklist') as FormArray
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private stepService: StepService,
    private router: Router,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      checklist: new FormArray([
        new FormGroup({
          title: new FormControl(''),
          isChecked: new FormControl(false)
        })
      ])
    })

    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.task_id = data['id']
    })

    this.firestore.collection("tasks").doc(this.task_id).get().subscribe((data: any) => {
      this.task = data.data();
    })
  }

  pushItemToChecklist() {
    this.checklist.push(new FormGroup({
      title: new FormControl(''),
      isChecked: new FormControl(false)
    }));
  }

  deleteItemFromChecklist(index: number) {
    this.checklist.removeAt(index)
  }

  createStep() {

    let step = this.form.value

    console.log(step)
    // step.checklist = step.checklist.map(function (item: any) {
    //   console.log(item)
    //   return {
    //     "status": "not_started",
    //     "title": item
    //   }
    // })

    let file_id = "";

    if (this.file) {
      file_id = '/images' + Math.random() + this.file

      const ref = this.afStorage.ref(file_id);
      const task = ref.put(this.file);
    }

    step.file = file_id

    this.stepService.createStep(step, this.task_id, this.task).then((data: any) => {
      this.router.navigate(["/system/task-info"], { queryParams: { element_id: this.task_id } })
    })
  }

  myUploader(event: any) {
    this.file = event.files[0]
  }
}
