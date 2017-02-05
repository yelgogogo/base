import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkareaComponent } from './workarea.component';
import { WorkspaceComponent } from './workspace.component';
import { Login } from './login';
import { SignupComponent } from './signup.component'
import {RegsComponent} from './regs.component'
import {RegDetailComponent} from './regdetail.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
      path: 'login',
      component: Login
  },
  {
      path: 'signup',
      component: SignupComponent
  },
  {
    path: 'workspace/:id',
    component: WorkspaceComponent
  },
  {
    path: 'workarea',
    component: WorkareaComponent
  },
  {
    path: 'regs',
    component: RegsComponent
  },
  {
    path: 'regdetail/:id',
    component: RegDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [Login,SignupComponent, WorkareaComponent, WorkspaceComponent,RegDetailComponent,RegsComponent];
