import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  organization_id = window.localStorage.getItem('organization_id')

  constructor(public firestore: AngularFirestore) { }

  getWorkers() {
    return this.firestore.collection("/workers", ref => ref.where("organization_id", "==", this.organization_id)).snapshotChanges()
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

    worker.organization_id = this.organization_id
    return this.firestore.collection("workers").add(worker)
  }

  updateWorker(worker_id: string, worker: any) {
    return this.firestore.collection("workers").doc(worker_id).update(worker)
  }

  addOrganization(organizaion: any) {
    return this.firestore.collection("organization").add(organizaion)
  }
}
