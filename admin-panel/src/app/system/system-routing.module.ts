import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentPageComponent } from './assignment-page/assignment-page.component';
import { SystemComponent } from './system.component';
import { TaskInfoPageComponent } from './task-info-page/task-info-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { WorkerInfoPageComponent } from './worker-info-page/worker-info-page.component';
import { WorkersPageComponent } from './workers-page/workers-page.component';


const routes: Routes = [
  {path: 'system', component: SystemComponent, children: [
    {path: 'worker-info', component: WorkerInfoPageComponent},
    {path: 'workers', component: WorkersPageComponent},
    {path: 'tasks', component: TasksPageComponent},
    {path: 'assignment', component: AssignmentPageComponent},
    {path: 'task-info', component: TaskInfoPageComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
