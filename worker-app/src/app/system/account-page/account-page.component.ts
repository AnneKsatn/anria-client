import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  user_id: string;
  user: any

  constructor(
    private firestore: AngularFirestore
  ) { 
    this.user_id = String(window.localStorage.getItem("user_id"))
  }

  ngOnInit(): void {
    this.firestore.collection("workers").doc(this.user_id).get().subscribe((data) => {
      this.user = data.data()
    })
  }

}
