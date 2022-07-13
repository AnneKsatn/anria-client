import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getStep(assignmentId: string, stepId: string): Observable<any> {

    let url = "assignments/" + assignmentId + "/steps"
    return this.firestore.collection(url).doc(stepId).get()
  }

  updateStep(assignmentId: string, stepId: string, step: any) {
    let url = "assignments/" + assignmentId + "/steps"
    return this.firestore.collection(url).doc(stepId).update(step)
  }

  getSteps(assignmentId: string) {
    let url = "assignments/" + assignmentId + "/steps"
    return this.firestore.collection(url).snapshotChanges()
  }
}
