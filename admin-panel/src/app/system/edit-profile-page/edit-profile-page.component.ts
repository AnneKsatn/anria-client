import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WorkerService } from 'src/app/shared/services/worker.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {


  constructor(
    private workerService: WorkerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  form!: FormGroup;
  worker_id!: string;
  worker!: any;

  ngOnInit() {
    this.form = new FormGroup({
      'surname': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'patronymic': new FormControl(),
      'phone': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'region': new FormControl(''),
      'department': new FormControl(''),
      'position': new FormControl(''),
      'number': new FormControl()
    })

    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.worker_id = data['id']

      this.workerService.getWorkerById(this.worker_id).subscribe((data: any) => {
        this.worker = data.data()
        // console.log(this.worker)

        this.form.setValue({
          'name': this.worker.name,
          'surname': this.worker.surname,
          'patronymic': this.worker.patronymic,
          'phone': this.worker.phone,
          'email': this.worker.email,
          'password': this.worker.password,
          'region': this.worker.region || '',
          'department': this.worker.department,
          'position': this.worker.position,
          'number': this.worker.number || '',
        })
      })

    })
  }

  updateUser() {
    console.log(this.form.value)
    this.workerService.updateWorker(this.worker_id, this.form.value).then((data: any) => {
      this.router.navigate(["system/user-info", this.worker_id, "details"])
    })
  }
}
