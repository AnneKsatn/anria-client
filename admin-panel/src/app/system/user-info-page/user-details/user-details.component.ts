import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentSnapshot } from 'firebase/firestore';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  worker_id: any;
  worker?: User;
  displayDeleteDialog: boolean = false;
  displayPasswordDialog: boolean = false;
  password?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private UserService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.worker_id = params['id']
    })

    this.UserService.getWorkerById(this.worker_id).subscribe((worker: DocumentSnapshot<User>) => {
      this.worker = worker.data()
      this.cdr.detectChanges()
    })
  }

  showDeleteDialog() {
    this.displayDeleteDialog = true;
  }

  deleteWorker() {
    this.UserService.deleteWorkerById(this.worker_id).then((data: any) => {
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
    this.UserService.updateWorker(this.worker_id, { 'password': this.password })
    this.displayPasswordDialog = false;
  }
}
