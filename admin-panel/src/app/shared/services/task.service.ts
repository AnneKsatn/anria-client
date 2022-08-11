import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

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

  getTaskByID(id: string): Observable<any> {
    return this.firestore.collection("tasks").doc(id).get()
  }

  updateTask(id: string, task: Task) {
    return this.firestore.collection("tasks").doc(id).update(task)
  }

  getTasks() {
    return this.firestore.collection('/tasks').snapshotChanges()
  }

  addTask(task: Task) {
    return this.firestore.collection("/tasks").add(task)
  }
}
