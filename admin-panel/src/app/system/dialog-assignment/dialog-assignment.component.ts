import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';


export interface DialogData {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  department: string;
  position: string;
}

interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-dialog-assignment',
  templateUrl: './dialog-assignment.component.html',
  styleUrls: ['./dialog-assignment.component.scss']
})
export class DialogAssignmentComponent {

  categories = [];

  worker: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public firestore: AngularFirestore) {
      console.log(this.data)
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
