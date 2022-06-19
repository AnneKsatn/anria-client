import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {

  options: any = {};

  constructor() { }

  ngOnInit(): void {
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

}
