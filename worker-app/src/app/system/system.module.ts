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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddTaskComponent } from './tasks-page/dialog-add-task/dialog-add-task.component';
import { DialogAssignmentComponent } from './dialog-assignment/dialog-assignment.component';
import { TaskInfoPageComponent } from './task-info-page/task-info-page.component';
import { DialogAddStepComponent } from './task-info-page/dialog-add-step/dialog-add-step.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AssignmentInfoComponent } from './assignment-info/assignment-info.component';
import { MainPageComponent } from './main-page/main-page.component'

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
    AssignmentInfoComponent,
    MainPageComponent
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
    MatSelectModule,
    MatCardModule
  ]
})
export class SystemModule { }
