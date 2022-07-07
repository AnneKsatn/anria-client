import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
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
    checklist: this.fb.array([])
  });

  task_id!: string;
  task!: any;
  file: any;

  get checklist() {
    return this.form?.get('checklist') as FormArray
  }

  step_id!: string;
  step!: any;
  image_src: any;

  @ViewChild('fileInput') fileInput?: FileUpload;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stepService: StepService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    // private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    // private stepService: StepService,
    private router: Router,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.step_id = params["id"]

      this.stepService.getStepById(this.step_id).subscribe((data: any) => {
        this.step = data.data()

        data.data().checklist.forEach((element: any) => {
          this.checklist.push(this.fb.control('', Validators.required));
        });

        this.form.setValue({
          title: data.data().title,
          description: data.data().description,
          checklist: data.data().checklist
        })

        const ref = this.storage.ref(this.step.file);
        ref.getDownloadURL().subscribe((data: any) => {
          this.image_src = data

          this.fileInput?.files.push()
          console.log(this.image_src)
        })

      })
    })


    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.task_id = data['id']
    })

    this.firestore.collection("tasks").doc(this.task_id).get().subscribe((data: any) => {
      this.task = data.data();
    })
  }

  send() {
    console.log(this.fileInput?.files)
    this.fileInput?._files.push()


  }

  pushItemToChecklist() {
    this.checklist.push(this.fb.control('', Validators.required));
  }

  deleteItemFromChecklist(index: number) {
    this.checklist.removeAt(index)
  }

  createStep() {
    let file_id = '/images' + Math.random() + this.file

    const ref = this.afStorage.ref(file_id);
    const task = ref.put(this.file);

    let step = this.form.value
    step.file = file_id

    this.stepService.createStep(step, this.task_id, this.task).then((data: any) => {
      this.router.navigate(["/system/task-info"], { queryParams: { element_id: this.task_id } })
    })
  }

  myUploader(event: any) {
    this.file = event.files[0]
  }
}
