import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { WorkersPageComponent } from './workers-page/workers-page.component';
import { SystemComponent } from './system.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DialogAddWorkerComponent } from './workers-page/dialog-add-worker/dialog-add-worker.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { AssignmentPageComponent } from './assignment-page/assignment-page.component';
import { WorkerInfoPageComponent } from './worker-info-page/worker-info-page.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DialogAddTaskComponent } from './tasks-page/dialog-add-task/dialog-add-task.component';
import { DialogAssignmentComponent } from './dialog-assignment/dialog-assignment.component';
import { TaskInfoPageComponent } from './task-info-page/task-info-page.component';
import {OrderListModule} from 'primeng/orderlist';
import { DialogAddStepComponent } from './task-info-page/dialog-add-step/dialog-add-step.component';


@NgModule({
  declarations: [
    WorkersPageComponent,
    SystemComponent,
    DialogAddWorkerComponent,
    TasksPageComponent,
    AssignmentPageComponent,
    WorkerInfoPageComponent,
    DialogAddTaskComponent,
    DialogAssignmentComponent,
    TaskInfoPageComponent,
    DialogAddStepComponent
  ],
  imports: [
    NgbModalModule,
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    OrderListModule
  ]
})
export class SystemModule { }
