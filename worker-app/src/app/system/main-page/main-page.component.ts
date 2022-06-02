import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  assignments: any = []
  user: any = {}
  user_id: string

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private assignmentService: AssignmentsService
    ) {
      this.user_id = String(window.localStorage.getItem("user_id"))
    }

  ngOnInit(): void {
    this.assignmentService.getAssignmentsByIdAndDate(this.user_id, new Date()).subscribe((data: any) => {
      this.assignments = data.map(function (assignment: any) {
        return {
          "date_end": new Date(assignment.payload.doc.data().date_end),
          "date_start": new Date(assignment.payload.doc.data().date_start),
          "task_id": assignment.payload.doc.data().task_id,
          "task_title": assignment.payload.doc.data().task_title,
          "id": assignment.payload.doc.id,
        }
      })
    })

    this.firestore.collection("workers").doc(this.user_id).get().subscribe((data: any) => {
      this.user = data.data()
    })
  }


  goToAssignment(assignment: any) {
    this.router.navigate(["/system/assignment"], {
      queryParams: {
        assignment_id: assignment.id,
        task_id: assignment.task_id
      }
    })
  }
}
