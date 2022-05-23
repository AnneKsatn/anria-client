import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-info-page',
  templateUrl: './task-info-page.component.html',
  styleUrls: ['./task-info-page.component.scss']
})
export class TaskInfoPageComponent implements OnInit {

  task_id: any

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) { }
  steps: any
  // steps: any = [
  //   {
  //     description: "Запустить ход балки посредством педали-выключателя БАЛКА ПРЕССА ВНИЗ и открыть одну из боковых защитных ворот",
  //     number: 1,
  //   },
  //   {
  //     description: "Убедиться, что балка пресса останавливается",
  //     number: 2
  //   },
  //   {
  //     description: "Подтвердить сообщени об ошибке нажатием на педать БАЛКА ПРЕССА ВНИЗ",
  //     number: 3
  //   },
  //   {
  //     description: "Запустить ход балки посредством ножного переключателя БАЛКА ПРЕССА ВНИЗ",
  //     number: 4
  //   },
  //   {
  //     description: "Открыть боковые защитные ворота с обеих сторон",
  //     number: 5
  //   },
  //   {
  //     description: "Проверить происходит ли следующее",
  //     number: 6
  //   }
  // ];

  cars: any;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( (params: any) => {
      // this.task = params.get('element');    
      console.log(params['element_id'])

      this.task_id = params['element_id']
    });

    this.firestore.collection("task-steps").snapshotChanges().subscribe((data: any) => {
      this.steps = data.map(function(step: any) {
        return {
          description: step.payload.doc.data().description,
          number: step.payload.doc.data().number,
          id: step.payload.doc.id,
        }
      })
    })

    this.cars = [
      {brand: "kek"},
      {brand: "kek"},
      {brand: "kek"},
      {brand: "kek"},
      {brand: "kek"},
      {brand: "kek"}
    ]
  }

  orderChanged() {
    this.steps.forEach((step: any, index: any) => {
      step.number = index + 1
    });
  }

  addStep() {
    let number = this.steps.length + 1

    this.steps = [...this.steps, {
        description: "Проверить происходит ли следующее",
        number: number
      }];

    this.firestore.collection("task-steps").add(
      {
        description: "Проверить происходит ли следующее",
        number: number,
        task_id: this.task_id
      }
    )
  }
}
