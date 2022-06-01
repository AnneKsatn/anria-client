import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  assignments: any = []

  constructor(
    private firestore: AngularFirestore,
    private router: Router) { }

  ngOnInit(): void {
    this.firestore.collection("assignments", ref => ref.where("worker_id", "==", "2R1BEiD1pMx3jKfGeHLV"))
    .snapshotChanges().subscribe((data: any) => {
        this.assignments = data.map(function(assignment: any) {
            return {
                "date_end": assignment.payload.doc.data().date_end,
                "date_start": assignment.payload.doc.data().date_start,
                "task_id": assignment.payload.doc.data().task_id,
                "task_title": assignment.payload.doc.data().task_title,
                "id": assignment.payload.doc.id,
            }
        })

        console.log(this.assignments)
    })
  }

  
  goToAssignment(id: any) {
    this.router.navigate(["/system/assignment"],  {queryParams: {id: id}})
}

}
