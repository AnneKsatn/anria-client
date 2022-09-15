import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  phone: number;
  position: string;
  department: string;
}

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {


  users: any = [];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  //подгрузить из бд или убать фильтры
  departments = [
    { name: "IT - отдел" }
  ];

  //подгрузить из бд или убрать фильтры
  positions = [
    { label: 'Angular - разработчик' }
  ]

  constructor(
    public UserService: UserService,
    public router: Router) { }

  ngOnInit(): void {

    this.loading = false;

    this.UserService.getWorkers().subscribe((data: any) => {
      let users = data.map(function (procedure: any) {
        return {
          fullname: procedure.payload.doc.data().surname
            + " " +
            procedure.payload.doc.data().name
            + " " +
            procedure.payload.doc.data().patronymic,
          name: procedure.payload.doc.data().name,
          surname: procedure.payload.doc.data().surname,
          patronymic: procedure.payload.doc.data().patronymic,
          phone: procedure.payload.doc.data().phone,
          email: procedure.payload.doc.data().email,
          department: procedure.payload.doc.data().department,
          position: procedure.payload.doc.data().position,
          id: procedure.payload.doc.id,
          status: "в системе"
        }
      })

      this.users = users
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  addWorker() {
    this.router.navigateByUrl("/system/add-worker")
  }

  goToWorkerPage(worker_id: any) {
    this.router.navigate(["/system/user-info", worker_id, "calendar"])
  }

  clear(table: any) {
    table.clear();
  }
}

