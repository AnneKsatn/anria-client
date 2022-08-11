import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, weeksToDays } from 'date-fns';
import { Subject } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import { ConditionalExpr } from '@angular/compiler';


@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  options: any = {};
  worker_id: string = "";
  worker: any = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private UserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.worker_id = params['id']
    })

    this.setOptions()
    this.getAssignments()
    this.getWorkerInfo()
  }

  assignTask(): void {
    this.router.navigate(["/system/user-info", this.worker_id, "assign-task"])
  }

  setOptions() {
    this.options = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      weekends: false,
      selectMirror: true,
      dayMaxEvents: true,
      initialView: 'timeGridWeek',
      locale: 'ru',
      events: [],
      scrollTime: '9:00:00',
      height: "100%"
    };
  }

  getAssignments() {
    this.firestore.collection("assignments", ref => ref.where("worker_id", "==", this.worker_id))
      .snapshotChanges().subscribe((data: any) => {
        this.options.events = data.map(function (event: any) {
          return {
            start: new Date(event.payload.doc.data().date_start),
            end: new Date(event.payload.doc.data().date_end),
            task_id: event.payload.doc.data().task_id,
            title: event.payload.doc.data().task_title
          }
        })
        this.cd.detectChanges();
      })
  }

  getWorkerInfo() {
    this.UserService.getWorkerById(this.worker_id).subscribe((doc: any) => {
      this.worker = doc.data()
      this.cd.detectChanges();
    })
  }

  deleteWorker() {
    this.UserService.deleteWorkerById(this.worker_id).then((data) => {
      this.router.navigateByUrl("/system/workers")
    })
  }

  saveWorker() {
    this.firestore.collection("workers").doc(this.worker_id).update(this.worker)
  }

  editWorker() {
    this.router.navigateByUrl("system/edit-profile-page")
  }

  openInfo() {
    this.router.navigate(["/system/user-info", this.worker_id, "details"])
  }

  openCalendar() {
    this.router.navigate(["/system/user-info", this.worker_id, "calendar"])
  }

  openActivity() {
    this.router.navigate(["/system/user-info", this.worker_id, "activity"])
  }

  openOnboarding() {
    this.router.navigate(["/system/user-info", this.worker_id, "user-onboarding"])
  }
}
