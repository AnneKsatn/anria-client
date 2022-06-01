import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  description: string;
}

interface Animal {
  name: string;
  sound: string;
}



@Component({
  selector: 'app-dialog-add-step',
  templateUrl: './dialog-add-step.component.html',
  styleUrls: ['./dialog-add-step.component.scss']
})
export class DialogAddStepComponent {

  categories = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddStepComponent>,
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
