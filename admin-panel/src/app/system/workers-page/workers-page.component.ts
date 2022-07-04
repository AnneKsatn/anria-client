import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkerService } from 'src/app/shared/services/worker.service';
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

  // data: PeriodicElement[] = []; 

  users: any = [];
  data: any = []
  displayedColumns: string[] = ['fullname', 'phone', 'position', 'department'];
  columnsToDisplay: string[] = ['fullname', 'phone', 'position', 'department', 'info'];

  // columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public workerService: WorkerService,
    public router: Router) { }

  ngOnInit(): void {

    this.loading = false;

    this.workerService.getWorkers().subscribe((data: any) => {
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

      this.data = new MatTableDataSource(users)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  addWorker() {
    this.router.navigateByUrl("/system/add-worker")
    // const dialogRef = this.dialog.open(DialogAddWorkerComponent, {
    //   width: '50%',
    //   data: { surname: "", name: "", patronymic: "", phone: "", email: "", department: "", position: "", password: "" }
    //   // maxWidth: '100vw',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log(`Dialog result: ${result}`);
    //     this.firestore.collection("workers").add(result)
    //       .then(function (docRef) {
    //         console.log(docRef.id);
    //       })
    //   }
    // });
  }

  goToWorkerPage(worker_id: any) {
    this.router.navigate(["/system/user-info", worker_id, "calendar"])
  }


  customers: any[] = [];

  // representatives: any = [];

  // statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  representatives = [
    { name: "Amy Elsner", image: 'amyelsner.png' },
    { name: "Anna Fali", image: 'annafali.png' },
    { name: "Asiya Javayant", image: 'asiyajavayant.png' },
    { name: "Bernardo Dominic", image: 'bernardodominic.png' },
    { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
    { name: "Ioni Bowcher", image: 'ionibowcher.png' },
    { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
    { name: "Onyama Limba", image: 'onyamalimba.png' },
    { name: "Stephen Shaw", image: 'stephenshaw.png' },
    { name: "Xuxue Feng", image: 'xuxuefeng.png' }
  ];

  statuses = [
    { label: 'Unqualified', value: 'unqualified' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'New', value: 'new' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Renewal', value: 'renewal' },
    { label: 'Proposal', value: 'proposal' }
  ]

  clear(table: any) {
    table.clear();
  }
}

