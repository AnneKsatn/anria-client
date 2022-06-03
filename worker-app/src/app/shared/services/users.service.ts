import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const collection_title = "workers"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getUserByEmail(email: string) {
    return this.firestore.collection(collection_title, ref => ref.where("email", "==", email)).snapshotChanges()
  }
}
