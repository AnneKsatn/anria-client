import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentInfoComponent } from './assignment-info/assignment-info.component';
import { AssignmentPageComponent } from './assignment-page/assignment-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SystemComponent } from './system.component';
import { TaskInfoPageComponent } from './task-info-page/task-info-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { WorkersPageComponent } from './workers-page/workers-page.component';


const routes: Routes = [
  {path: 'system', component: SystemComponent, children: [
    {path: 'workers', component: WorkersPageComponent},
    {path: 'tasks', component: TasksPageComponent},
    // {path: 'assignment', component: AssignmentPageComponent},
    {path: 'task-info', component: TaskInfoPageComponent},
    {path: 'assignment', component: AssignmentInfoComponent},
    {path: 'main-page', component: MainPageComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
