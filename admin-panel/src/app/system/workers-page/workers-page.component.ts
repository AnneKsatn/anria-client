import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddWorkerComponent } from './dialog-add-worker/dialog-add-worker.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkerService } from 'src/app/shared/services/worker.service';
import { Router } from '@angular/router';
import { DialogAssignmentComponent } from '../dialog-assignment/dialog-assignment.component';

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

  data: any = [];
  displayedColumns: string[] = ['fullname', 'phone', 'position', 'department'];
  columnsToDisplay: string[] = ['fullname', 'phone', 'position', 'department', 'info'];

  // columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(
    public dialog: MatDialog, 
    public firestore: AngularFirestore,
    public workerService: WorkerService,
    public router: Router) { }

  ngOnInit(): void {
    this.workerService.getWorkers().subscribe((data: any) => {
      let data2 = data.map(function (procedure: any) {
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
          id: procedure.payload.doc.id
        }
      })

      this.data = new MatTableDataSource(data2)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  addWorker() {
    const dialogRef = this.dialog.open(DialogAddWorkerComponent, {
      width: '50%',
      data: { surname: "", name: "", patronymic: "", phone: "", email: "", department: "", position: "", password: "" }
      // maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Dialog result: ${result}`);
        this.firestore.collection("workers").add(result)
          .then(function (docRef) {
            console.log(docRef.id);
          })
      }
    });
  }

  goToWorkerPage(worker_id: any) {
    this.router.navigate(["/system/worker-info"],  {queryParams: {worker_id: worker_id}})
  }
}

