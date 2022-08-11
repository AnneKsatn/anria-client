import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot } from 'firebase/firestore';
import { FileUpload } from 'primeng/fileupload';
import { Step } from 'src/app/shared/models/step.model';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-step-info-page',
  templateUrl: './step-info-page.component.html',
  styleUrls: ['./step-info-page.component.scss']
})
export class StepInfoPageComponent implements OnInit {

  form: FormGroup = this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    checklist: new FormArray([])
  });

  task_id!: string;
  file: any;

  get checklist() {
    return this.form?.get('checklist') as FormArray
  }

  step_id!: string;
  step!: Step;
  image_src: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stepService: StepService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private router: Router,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.step_id = params["id"]
      this.task_id = params["task_id"]

      this.stepService.getStepById(this.step_id).subscribe((data: DocumentSnapshot<Step>) => {
        this.step = data.data()!

        data.data()!.checklist.forEach((element: any) => {
          this.checklist.push(
            new FormGroup({
              title: new FormControl(''),
              isChecked: new FormControl('')
            })
          );
        });

        this.form.setValue({
          title: data.data()!.title,
          description: data.data()!.description,
          checklist: data.data()!.checklist
        })

        const ref = this.storage.ref(this.step.file);
        ref.getDownloadURL().subscribe((data: any) => {
          this.image_src = data
          console.log(this.image_src)
        })
      })
    })
  }


  pushItemToChecklist() {
    this.checklist.push(
      new FormGroup({
        title: new FormControl(''),
        isChecked: new FormControl(false)
      })
    );
  }

  deleteItemFromChecklist(index: number) {
    this.checklist.removeAt(index)
  }

  updateStep(file: any) {
    let step = this.form.value
    step.file = file

    // console.log(step)

    this.stepService.updateStep(step, this.step_id).then((data: any) => {
      this.router.navigate(["/system/task-info"], { queryParams: { element_id: this.task_id } })
    })
  }

  myUploader(event: any) {
    this.file = event.files[0]
  }

  deletePhoto() {
    this.afStorage.ref(this.step.file).delete()
    this.step.file = ""

    this.stepService.updateStep(this.step, this.step_id).then((data: any) => {

    })
  }

  addPhoto() {
    let file_id = '/images' + Math.random() + this.file
    const ref = this.afStorage.ref(file_id);
    const task = ref.put(this.file);

    this.step.file = file_id

    this.stepService.updateStep(this.step, this.step_id).then((data: any) => {

    })
  }
}
