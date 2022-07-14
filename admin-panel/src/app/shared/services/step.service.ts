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

  getStepById(id: string): Observable<any> {
    return this.firestore.collection("steps").doc(id).get()
  }

  createStep(step: any, task_id: string, task: any) {

    let context = this;

    return this.firestore.collection("steps").add(step).then(function (docRef) {

      task.steps = [...task.steps, docRef.id];
      context.firestore.collection("tasks").doc(task_id).update(
        task
      )
    })
  }

  updateStep(step: any, step_id: string) {
    return this.firestore.collection("steps").doc(step_id).update(step)
  }

}
