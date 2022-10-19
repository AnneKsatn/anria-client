import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private firestore: AngularFirestore) { }

  getCompanyByTitle(title: string) {
    return this.firestore.collection("/organization", ref => ref.where("title", "==", title))
  }

  addOrganization(organizaion: any) {
    return this.firestore.collection("organization").add(organizaion)
  }
}
