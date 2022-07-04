import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assingment-ingo-page',
  templateUrl: './assingment-ingo-page.component.html',
  styleUrls: ['./assingment-ingo-page.component.scss']
})
export class AssingmentIngoPageComponent implements OnInit {

  id?: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.id = params['id']
    })
  }

}
