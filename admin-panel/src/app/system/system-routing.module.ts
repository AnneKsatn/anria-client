import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { TaskInfoPageComponent } from './task-info-page/task-info-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { AddWorkerPageComponent } from './add-worker-page/add-worker-page.component'
import { WorkersPageComponent } from './workers-page/workers-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { UserCalendarComponent } from './user-info-page/user-calendar/user-calendar.component';
import { UserDetailsComponent } from './user-info-page/user-details/user-details.component';
import { UserActivityComponent } from './user-info-page/user-activity/user-activity.component';
import { GroupsComponent } from './groups/groups.component';
import { AssignTaskComponent } from './user-info-page/assign-task/assign-task.component';
import { UserOnboardingComponent } from './user-info-page/user-onboarding/user-onboarding.component';
import { LocalizationPageComponent } from './localization-page/localization-page.component';
import { StepInfoPageComponent } from './task-info-page/step-info-page/step-info-page.component';
import { AssignmentInfoComponent } from './user-info-page/assignment-info/assignment-info.component';
import { AssingmentsPageComponent } from './assingments-page/assingments-page.component';
import { AssingmentIngoPageComponent } from './assingment-info-page/assingment-ingo-page.component';
import { AddStepPageComponent } from './task-info-page/add-step-page/add-step-page.component';


const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      {
        path: 'user-info/:id', component: UserInfoPageComponent, children: [
          { path: 'calendar', component: UserCalendarComponent },
          { path: 'details', component: UserDetailsComponent },
          { path: 'activity', component: UserActivityComponent },
          { path: 'assign-task', component: AssignTaskComponent },
          { path: 'user-onboarding', component: UserOnboardingComponent },
          { path: 'assignment/:id', component: AssignmentInfoComponent }
        ]
      },
      { path: 'workers', component: WorkersPageComponent },
      { path: 'tasks', component: TasksPageComponent },
      { path: 'assignment-info', component: AssingmentIngoPageComponent },
      { path: 'task-info', component: TaskInfoPageComponent },
      { path: 'add-worker', component: AddWorkerPageComponent },
      { path: 'edit-profile-page', component: EditProfilePageComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'assistant', component: LocalizationPageComponent },
      { path: 'step-info', component: StepInfoPageComponent },
      { path: 'assignments', component: AssingmentsPageComponent },
      { path: 'add-step', component: AddStepPageComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
