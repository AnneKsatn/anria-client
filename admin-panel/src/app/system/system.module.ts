import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { WorkersPageComponent } from './workers-page/workers-page.component';
import { SystemComponent } from './system.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogAddWorkerComponent } from './workers-page/dialog-add-worker/dialog-add-worker.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { AssignmentPageComponent } from './assignment-page/assignment-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DialogAddTaskComponent } from './tasks-page/dialog-add-task/dialog-add-task.component';
import { DialogAssignmentComponent } from './dialog-assignment/dialog-assignment.component';
import { TaskInfoPageComponent } from './task-info-page/task-info-page.component';
import { OrderListModule } from 'primeng/orderlist';
import { DialogAddStepComponent } from './task-info-page/dialog-add-step/dialog-add-step.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatSelectModule } from '@angular/material/select';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { AddWorkerPageComponent } from './add-worker-page/add-worker-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { UserCalendarComponent } from './user-info-page/user-calendar/user-calendar.component';
import { TabViewModule } from 'primeng/tabview';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserDetailsComponent } from './user-info-page/user-details/user-details.component';
import { UserActivityComponent } from './user-info-page/user-activity/user-activity.component';
import { GroupsComponent } from './groups/groups.component';
import { AssignTaskComponent } from './user-info-page/assign-task/assign-task.component';

import { CalendarModule } from 'primeng/calendar';
import { UserOnboardingComponent } from './user-info-page/user-onboarding/user-onboarding.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { LocalizationPageComponent } from './localization-page/localization-page.component';
import { StepInfoPageComponent } from './task-info-page/step-info-page/step-info-page.component';
import { DialogModule } from 'primeng/dialog';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    WorkersPageComponent,
    SystemComponent,
    DialogAddWorkerComponent,
    TasksPageComponent,
    AssignmentPageComponent,
    DialogAddTaskComponent,
    DialogAssignmentComponent,
    TaskInfoPageComponent,
    DialogAddStepComponent,
    AddWorkerPageComponent,
    EditProfilePageComponent,
    UserCalendarComponent,
    UserInfoPageComponent,
    UserDetailsComponent,
    UserActivityComponent,
    GroupsComponent,
    AssignTaskComponent,
    UserOnboardingComponent,
    LocalizationPageComponent,
    StepInfoPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SystemRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlatpickrModule.forRoot(),
    OrderListModule,
    FullCalendarModule,
    MatSelectModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ReactiveFormsModule,
    TabViewModule,
    CalendarModule,
    TimelineModule,
    CardModule,
    DialogModule
  ]
})
export class SystemModule { }
