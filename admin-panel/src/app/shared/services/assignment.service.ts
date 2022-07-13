import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAssignmentById(id: string): Observable<any> {
    return this.firestore.collection("/assignments").doc(id).get()
  }

  deleteAssignment(id: string): any {
    return this.firestore.collection("/assignments").doc(id).delete()
  }
}
