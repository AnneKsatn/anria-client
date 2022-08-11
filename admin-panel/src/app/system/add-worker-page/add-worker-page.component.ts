import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-worker-page',
  templateUrl: './add-worker-page.component.html',
  styleUrls: ['./add-worker-page.component.scss']
})
export class AddWorkerPageComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private router: Router
  ) { }

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      'surname': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'patronymic': new FormControl(),
      'phone': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'region': new FormControl(),
      'department': new FormControl(),
      'position': new FormControl(),
      'number': new FormControl()
    })
  }

  addUser() {
    this.UserService.addWorker(this.form.value).then(err => {
      this.router.navigateByUrl("system/workers")
    })
  }
}
