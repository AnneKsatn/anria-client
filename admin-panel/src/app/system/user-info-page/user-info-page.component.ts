import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';



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
    private cd: ChangeDetectorRef,
    private UserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.worker_id = params['id']
    })

    this.getWorkerInfo()
  }

  assignTask(): void {
    this.router.navigate(["/system/user-info", this.worker_id, "assign-task"])
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
