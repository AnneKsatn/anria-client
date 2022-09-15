import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.email),
    'password': new FormControl('', Validators.minLength(5))
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.userService.getUserByEmail(this.form.value.email).snapshotChanges().subscribe((doc: any) => {
      doc = doc.map(function (item: any) {
        return {
          "email": item.payload.doc.data().email,
          "password": item.payload.doc.data().password,
          "role": item.payload.doc.data().role,
          "organization_id": item.payload.doc.data().company_id,
          "id": item.payload.doc.id
        }
      })[0]

      if (doc) {
        if (this.form.value.password == doc.password && doc.role == 'admin') {

          window.localStorage.setItem('organization_id', doc.company_id)
          window.localStorage.setItem('user', doc.id)

          this.authService.login()
          this.router.navigateByUrl("/system/workers")
        }
      }
    })
  }

  registration() {
    this.router.navigateByUrl("/registration")
  }

}
