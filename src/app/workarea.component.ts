import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Workspace } from './hero';
import { HeroService } from './hero.service';
import { WORKAREAPAGE } from './page-workarea';
import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';

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
  areas:any[]=[];
  error: any;
  gridcol:number;
  innerHeight: number;
  innerWidth: number;

  subscription: Subscription;
  nightmode=false;

  constructor(
    private router: Router,
    private heroService: HeroService,
    private missionService: MissionService) {
    this.subscription = missionService.modeChanged$.subscribe(
      mission => {
        // this.page=LOGINPAGE.find(page=>page.id == mission);
        this.nightmode=mission;
    });
  }

  getWorkspacees(): void {
    this.heroService
      .getWorkspaces()
      .then(workspaces => {
        let uniarea= new Set();
        workspaces.forEach(w=>{
          uniarea.add(JSON.stringify({RoomAreaId:w.RoomAreaId,RoomAreaName:w.RoomAreaName}));
          
          // switch (w.RoomTypeName) {
          //    case "小桌":
               w.cols=1;
               w.rows=1;
               // code...
        //        break;
             
        //      default:
        //        w.cols=1;
        //        w.rows=1;
        //        break;
        //    } (w.RoomTypeName === "小桌" )

         })
        console.log(uniarea);
        uniarea.forEach(u=>this.areas.push(JSON.parse(u)));
        // this.areas.sort();
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
    this.innerWidth=window.screen.width;
    this.innerHeight=window.screen.height;
    this.gridcol=Math.floor(this.innerWidth/90);
    this.getWorkspacees();
    this.nightmode=this.missionService.share;
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
    if (selected.RoomStateName === "消费" || selected.RoomStateName === "开房"){
      
      this.router.navigate(['/workspace', selected.ID]);  
    }else{
      // alert("未开房或者已买单");
    }


    // console.log(selectedWorkspace.ID);
    
  }

}
