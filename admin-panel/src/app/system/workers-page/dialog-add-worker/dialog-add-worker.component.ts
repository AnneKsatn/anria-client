import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';


export interface DialogData {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  password: string
}

interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-dialog-add-worker',
  templateUrl: './dialog-add-worker.component.html',
  styleUrls: ['./dialog-add-worker.component.scss']
})
export class DialogAddWorkerComponent {
  categories = [];

  worker: any

  constructor(
    public dialogRef: MatDialogRef<DialogAddWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data.worker)
      this.worker = data.worker
      // this.horseClubService.getCategories().subscribe((categories: any) => {
      //   this.categories = categories.map(category => {
      //     return {
      //       title: category.payload.doc.data().title,
      //       id: category.payload.doc.id
      //     }
      //   })
      // })
    }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
