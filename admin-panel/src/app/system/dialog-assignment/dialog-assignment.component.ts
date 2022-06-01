import {Component, Inject, OnInit} from '@angular/core';
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

  date_start: Date;
  date_end: Date;
  task: any
}

interface Animal {
  name: string;
  sound: string;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-assignment',
  templateUrl: './dialog-assignment.component.html',
  styleUrls: ['./dialog-assignment.component.scss']
})
export class DialogAssignmentComponent implements OnInit{

  categories = [];

  worker: any;

  selectedValue: string = "";
  selectedCar: string = "";

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  tasks: any = []

  ngOnInit(): void {
    this.firestore.collection("tasks").snapshotChanges().subscribe((data: any) => {
      this.tasks = data.map(function(task: any) {
        return {
          "id": task.payload.doc.id,
          "title": task.payload.doc.data().title
        }
      })

      console.log(this.tasks  )
    })
  }

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
