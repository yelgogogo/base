import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workspace } from './hero';
import { HeroService } from './hero.service';
import { WORKAREAPAGE } from './page-workarea';

@Component({
  //moduleId: module.id,
  selector: 'my-workarea',
  templateUrl: 'workarea.component.html',
  styleUrls: ['workarea.component.css']
})
export class WorkareaComponent implements OnInit {
  page=WORKAREAPAGE.find(page=>page.id == 1);

  workspaces: Workspace[];
  selectedWorkspace: Workspace;
  addingWorkspace = false;
  latestid = 18;
  error: any;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getWorkspacees(): void {
    this.heroService
      .getWorkspaceByOwner(JSON.parse(localStorage.getItem('id_token')).name)
      .then(workspaces => this.workspaces = workspaces)
      .catch(error => this.error = error);
  }

  addWorkspace(): void {
    this.addingWorkspace = true;
    this.selectedWorkspace = null;
  }

  close(savedWorkspace: Workspace): void {
    this.addingWorkspace = false;
    if (savedWorkspace) { this.getWorkspacees(); }
  }

  deleteWorkspace(workspace: Workspace, event: any): void {
    event.stopPropagation();
    this.heroService
      .delete(workspace)
      .then(res => {
        this.workspaces = this.workspaces.filter(h => h !== workspace);
        if (this.selectedWorkspace === workspace) { this.selectedWorkspace = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getWorkspacees();

    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=WORKAREAPAGE.find(page=>page.id == languageid);
    }
  }

  onSelect(workspace: Workspace): void {
    this.selectedWorkspace = workspace;
    this.addingWorkspace = false;
  }

  gotoWorkspace(): void {
    this.router.navigate(['/workspace', this.selectedWorkspace.id]);
  }

}
