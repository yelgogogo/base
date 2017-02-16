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
  areas:string[]=['大厅','包房','外卖'];
  error: any;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getWorkspacees(): void {
    this.heroService
      .getWorkspaces()
      .then(workspaces => {
        workspaces.forEach(w=>{
          switch (w.RoomTypeName) {
             case "小桌":
               w.cols=1;
               w.rows=1;
               // code...
               break;
             
             default:
               w.cols=1;
               w.rows=1;
               break;
           } (w.RoomTypeName === "小桌" )

        })
        this.workspaces = workspaces;})
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

  // gotoArea(selected: string): void {
  //   this.workspaces=this.workspaces.filter(s=>s.area===selected);
  //   console.log(this.workspaces);
  // }

  gotoWorkspace(selected: Workspace): void {
    if (selected.RoomStateName === "空房" || selected.RoomStateName === "买单"){
      alert("未开房或者已买单");
    }else{
      this.router.navigate(['/workspace', selected.ID]);  
    }


    // console.log(selectedWorkspace.ID);
    
  }

}
