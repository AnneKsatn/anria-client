import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public firestore: AngularFirestore) { }

  getWorkers() {
    return this.firestore.collection("/workers").snapshotChanges()
  }

  getWorkerById(id: string): Observable<any> {
    return this.firestore.collection("workers").doc(id).get()
  }

  getUserByEmail(email: string) {
    return this.firestore.collection("/workers", ref => ref.where("email", "==", email))
  }

  deleteWorkerById(id: string) {
    return this.firestore.collection("/workers").doc(id).delete()
  }

  addWorker(worker: any) {
    return this.firestore.collection("workers").add(worker)
  }

  updateWorker(worker_id: string, worker: any) {
    return this.firestore.collection("workers").doc(worker_id).update(worker)
  }

  addOrganization(organizaion: any) {
    return this.firestore.collection("organization").add(organizaion)
  }
}
