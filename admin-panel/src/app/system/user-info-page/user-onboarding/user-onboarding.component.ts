import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-user-onboarding',
  templateUrl: './user-onboarding.component.html',
  styleUrls: ['./user-onboarding.component.scss']
})
export class UserOnboardingComponent implements OnInit {

  events1: any[] = [];

  events2: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.events1 = [
      {
        title: 'Корпоративная культура',
        date: '15/10/2020 10:30',
        icon: PrimeIcons.SHOPPING_CART,
        color: '#9C27B0',
        image: 'game-controller.jpg',
        status: 'пройдено'
        // description: ''
      },
      { title: 'Информационная безопасность', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7', status: 'пройдено' },
      { title: 'Встреча с ментором', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800', status: 'пройдено' },
      { title: 'Пожарная безопасность', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B', status: 'пройдено' }
    ];

    this.events2 = [
      "2020", "2021", "2022", "2023"
    ];
  }

}
