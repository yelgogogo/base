import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Workspace,Regarray,File } from './hero';
import { HeroService } from './hero.service';
import { CATEGORIES,NODEUPLOAD } from './mock-data';
import { WORKSPACEPAGE } from './page-workspace';
import { FileUploader } from 'ng2-file-upload';
@Component({
  moduleId: module.id,
  selector: 'my-workspace',
  templateUrl: 'workspace.component.html',
  styleUrls: ['workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  page=WORKSPACEPAGE.find(page=>page.id == 1);

  @Input() workspace: Workspace;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  public uploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});
  nodeupload=NODEUPLOAD;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.forEach((params: Params) => {
      if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=WORKSPACEPAGE.find(page=>page.id == languageid);
      }

      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getWorkspace(id)
            .then(workspace => this.workspace = workspace);
      } else {
        this.navigated = false;
        this.workspace = new Workspace();
        this.workspace.owner = JSON.parse(localStorage.getItem('rapper_token')).name;  
        this.workspace.files=[];
        this.workspace.regs=[];
      }
    });

    this.uploader.onCompleteItem = (item, response, status, header) => {
        console.log(this.workspace);
        if (status === 200) {
          
          // let j:number;
          // for (j=0; j < response.length; ++j) {
            let element= new File();
            console.log(element);
            let resobj = JSON.parse(response);
            element.enable=true;
            element.filename=resobj.filename;
            element.path=resobj.path;
            element.createTime=resobj.createTime;
            // element.id=this.workspace.files.length + 1;
            element.convFlag=false;
            let tmp=element.path.replace(/uploads/,this.workspace.name);
            tmp=tmp.replace(/\-[0-9]*/,'');
            element.convPath=tmp

            if(this.workspace.files[0]){
              this.workspace.files.push(element);
            }
            else{
              this.workspace.files=[element];
            }
          // }
          
          
          console.log(this.workspace.files);
        }  
      };

    
  }

  save(): void {
    let today= new  Date();
    this.heroService.save(this.workspace)
        .then(workspace => {
          this.workspace = workspace; // saved workspace, w/ id if new
          this.goBack(workspace);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  delAttach(files:File,event:any): void{
      // console.log(this.workspace.files);
      this.workspace.files.splice(this.workspace.files.indexOf(files), 1);
      // console.log(this.workspace.files);
  }

  convFile(file:File,event:any): void{
    console.log(file);
    let f = this.workspace.files.findIndex(element => element == file);
    this.heroService.getConv(file,this.workspace.regs)
          .then(res => this.workspace.files[f] = res);
  }

  delReg(reg:File,event:any): void{
      // console.log(this.workspace.files);
      this.workspace.regs.splice(this.workspace.regs.indexOf(reg), 1);
      // console.log(this.workspace.files);
  }

  enable(reg:Regarray,event:any): void{
      // console.log(this.workspace.files);
      let i=this.workspace.regs.indexOf(reg);
      this.workspace.regs[0].enable = true;
      // console.log(this.workspace.files);
  }


  goBack(savedHero: Workspace = null): void {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
}
