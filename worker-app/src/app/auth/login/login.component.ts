import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    // 'email': new FormControl(null, [Validators.required, Validators.email]),
    // 'password': new FormControl(null, [Validators.required, Validators.minLength(6)])

    'email': new FormControl(null),
    'password': new FormControl(null)
  });

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    console.log(this.form.value)

    this.usersService.getUserByEmail(this.form.value.email).subscribe((data: any) => {
      if (data) {
        if (this.form.value.password == data[0].payload.doc.data().password) {

          window.localStorage.setItem('user_id', data[0].payload.doc.id)
          this.authService.login()
          this.router.navigateByUrl("/system/main-page")
        }
      }
    })
  }
}
