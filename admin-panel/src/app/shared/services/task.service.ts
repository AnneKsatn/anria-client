import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  deleteTask(id: string) {
    return this.firestore.collection("tasks").doc(id).delete()
  }
}
