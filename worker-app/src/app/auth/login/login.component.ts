import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onSubmit(){
    console.log(this.form)
    this.router.navigateByUrl("/system")
  }

}
