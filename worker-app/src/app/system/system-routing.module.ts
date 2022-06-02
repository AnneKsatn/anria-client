import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { AssignmentInfoComponent } from './assignment-info/assignment-info.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SystemComponent } from './system.component';


const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      { path: 'assignment', component: AssignmentInfoComponent },
      { path: 'main-page', component: MainPageComponent },
      { path: 'account', component: AccountPageComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
