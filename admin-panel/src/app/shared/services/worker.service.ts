import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(public firestore: AngularFirestore) { }

  getWorkers() {
    return this.firestore.collection("/workers").snapshotChanges()
  }

  getWorkerById(id: string) {
    return this.firestore.collection("workers").doc(id).get()
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
}
