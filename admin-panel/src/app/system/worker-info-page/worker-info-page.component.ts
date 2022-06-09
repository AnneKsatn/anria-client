import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, weeksToDays } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAssignmentComponent } from '../dialog-assignment/dialog-assignment.component';
import { MatDialog } from '@angular/material/dialog';
import { WorkerService } from 'src/app/shared/services/worker.service';


@Component({
  selector: 'app-worker-info-page',
  templateUrl: './worker-info-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./worker-info-page.component.scss']
})
export class WorkerInfoPageComponent implements OnInit {

  options: any = {};
  worker_id: string = "";
  worker: any = {}

  constructor(
    private modal: NgbModal,
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private workerService: WorkerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.worker_id = params['worker_id']
    });

    this.setOptions()
    this.getAssignments()
    this.getWorkerInfo()
  }

  addEvent(): void {

    let worker = {
      id: this.worker_id
    }
    const dialogRef = this.dialog.open(DialogAssignmentComponent, {
      width: '50%',
      data: { worker: worker }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);

        let assignment = {
          worker_id: result.worker.id,
          task_id: result.task.id,
          date_start: result.date_start,
          date_end: result.date_end,
          task_title: result.task.title
        }

        this.firestore.collection("assignments").add(assignment)
          .then(function (docRef) {
            console.log(docRef.id);
          })

      } else {
        console.log("no")
      }
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    // this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setOptions() {
    this.options = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      // editable: false,
      // selectable: true,
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

        // this.options.events.forEach((element: any) => {
        //   this.firestore.collection("tasks").doc(element.task_id).get().subscribe((data_2: any) => {
        //     element.title = data_2.data().title
        //     console.log(element.title)
        //     element.title="keeeek"
        //   })
        // });

        this.cd.detectChanges();
      })
  }

  getWorkerInfo() {
    this.workerService.getWorkerById(this.worker_id).subscribe((doc: any) => {
      this.worker = doc.data()

      this.cd.detectChanges();
    })
  }

  deleteWorker() {
    this.workerService.deleteWorkerById(this.worker_id).then((data) => {
      this.router.navigateByUrl("/system/workers")
    })
  }

  saveWorker() {
    this.firestore.collection("workers").doc(this.worker_id).update(this.worker)
  }
}
