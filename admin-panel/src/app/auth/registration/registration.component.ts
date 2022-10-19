import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router,
    private companyService: CompanyService
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
      'number': new FormControl(),
      "organizaion": new FormControl('', [Validators.required])
    })
  }

  registrate() {

    let organizaion = {
      "title": this.form.value.organizaion
    }

    this.companyService.addOrganization(organizaion).then(res => {

      let user = {
        "email": this.form.value.email,
        "name": this.form.value.name,
        "password": this.form.value.password,
        "patronymic": this.form.value.patronymic,
        "surname": this.form.value.surname,
        "phone": this.form.value.phone,
        "organization_id": res.id,
        "role": "admin"
      }

      this.userService.addWorker(user)
    })
  }

  login() {
    this.router.navigateByUrl("/login")
  }

}
