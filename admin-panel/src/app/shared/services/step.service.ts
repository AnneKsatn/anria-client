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
}
