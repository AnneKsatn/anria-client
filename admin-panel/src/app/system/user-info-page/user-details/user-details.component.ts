import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from 'src/app/shared/services/worker.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  worker_id: any;
  worker: any;
  displayDeleteDialog: boolean = false;
  displayPasswordDialog: boolean = false;
  password?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workerService: WorkerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.worker_id = params['id']
    })

    this.workerService.getWorkerById(this.worker_id).subscribe((worker: any) => {
      this.worker = worker.data()
    })
  }

  showDeleteDialog() {
    this.displayDeleteDialog = true;
  }

  deleteWorker() {
    this.workerService.deleteWorkerById(this.worker_id).then((data: any) => {
      this.router.navigateByUrl("system/workers")
    })
  }

  editWorker() {
    this.router.navigate(["system/edit-profile-page"], { queryParams: { id: this.worker_id } })
  }

  showResertPaswordDialog() {
    this.displayPasswordDialog = true;
  }

  resertPassword() {
    this.workerService.updateWorker(this.worker_id, { 'password': this.password })
    this.displayPasswordDialog = false;
  }
}
