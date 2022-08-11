import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot } from 'firebase/firestore';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  form!: FormGroup;
  userId!: string;
  user?: User;

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
      this.userId = data['id']

      this.userService.getWorkerById(this.userId).subscribe((data: DocumentSnapshot<User>) => {
        this.user = data.data()
        // console.log(this.worker)

        this.form.setValue({
          'name': this.user?.name,
          'surname': this.user?.surname,
          'patronymic': this.user?.patronymic,
          'phone': this.user?.phone,
          'email': this.user?.email,
          'password': this.user?.password,
          'region': this.user?.region || '',
          'department': this.user?.department,
          'position': this.user?.position,
          'number': this.user?.number || '',
        })
      })

    })
  }

  updateUser() {
    console.log(this.form.value)
    this.userService.updateWorker(this.userId, this.form.value).then((data: any) => {
      this.router.navigate(["system/user-info", this.userId, "details"])
    })
  }
}
