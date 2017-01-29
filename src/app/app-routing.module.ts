import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkareaComponent } from './workarea.component';
import { WorkspaceComponent } from './workspace.component';
import { Login } from './login';


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
    path: 'workspace/:id',
    component: WorkspaceComponent
  },
  {
    path: 'workarea',
    component: WorkareaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [Login, WorkareaComponent, WorkspaceComponent];
