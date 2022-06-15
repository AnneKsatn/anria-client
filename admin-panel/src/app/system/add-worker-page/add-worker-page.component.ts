import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-worker-page',
  templateUrl: './add-worker-page.component.html',
  styleUrls: ['./add-worker-page.component.scss']
})
export class AddWorkerPageComponent implements OnInit {

  constructor() { }

  form!: FormGroup;


  ngOnInit() {
    this.form = new FormGroup({
      'lastName': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'middleName': new FormControl(),
      'phone': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email, this.checkUser]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'region': new FormControl(),
      'department': new FormControl(),
      'position': new FormControl(),
      'number': new FormControl()
    })
  }

  addUser() {
    console.log(this.form)
  }

  checkUser(control: AbstractControl): ValidationErrors | null {
    if (control.value.length <= 4) {
      return {
        'isUserError': true
      }
    }
    return null
  }
}
