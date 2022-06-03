import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const collection_title = "assignments"

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAssignmentsByIdAndDate(user_id: string, date: Date) {

    date = new Date()



    return this.firestore.collection("assignments", ref => 
    ref
      .where("worker_id", "==", user_id)
      // .where("date_start", "==", date)
      .where("isCompleted", "!=", true)
      .orderBy("isCompleted")
      .orderBy("date_start")
    ).snapshotChanges()
  }
}
