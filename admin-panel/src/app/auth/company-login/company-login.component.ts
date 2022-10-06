import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss']
})
export class CompanyLoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'companyTitle': new FormControl('', Validators.minLength(1)),
  });

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void { }

  onSubmit() {

    this.companyService.getCompanyByTitle(this.form.value.companyTitle).snapshotChanges().subscribe((doc: any) => {
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

        console.log(doc.id)

        window.localStorage.setItem('organization_id', doc.id)
        this.router.navigate(["/login"], { queryParams: { id: doc.id } })
      }
    })
  }

  registration() {
    this.router.navigateByUrl("/registration")
  }
}
