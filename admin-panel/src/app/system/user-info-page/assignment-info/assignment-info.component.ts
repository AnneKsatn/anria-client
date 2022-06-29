import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment-info',
  templateUrl: './assignment-info.component.html',
  styleUrls: ['./assignment-info.component.scss']
})
export class AssignmentInfoComponent implements OnInit {

  assignment_id!: string;

  constructor(
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params: any) => {
      this.assignment_id = params['id']
    })
  }

}
