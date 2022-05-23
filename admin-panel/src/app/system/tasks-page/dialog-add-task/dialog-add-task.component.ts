import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';


export interface DialogData {
  title: string;
}

interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent{

  categories = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
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
