import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {

  options: any = {};
  worker_id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((data: any) => {
      this.worker_id = data['id']
    })

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
      height: "100%",
      eventClick: this.eventClick.bind(this)
    };


    this.firestore.collection("assignments", ref => ref.where("worker_id", "==", this.worker_id))
      .snapshotChanges().subscribe((data: any) => {
        this.options.events = data.map(function (event: any) {
          return {
            start: new Date(event.payload.doc.data().date_start),
            end: new Date(event.payload.doc.data().date_end),
            task_id: event.payload.doc.data().task_id,
            title: event.payload.doc.data().task_title,
            id: event.payload.doc.id
          }
        })

        console.log(this.options.events)

        this.options.events.forEach((element: any) => {
          this.firestore.collection("tasks").doc(element.task_id).get().subscribe((data_2: any) => {
            element.title = data_2.data().title
            console.log(element.title)
            element.title = "keeeek"

            this.cd.detectChanges();
          })
        });

        this.cd.detectChanges();
      })

  }

  eventClick(args: any) {
    this.router.navigate(["system/user-info", this.worker_id, "assignment", args.event.id])
  }
}
