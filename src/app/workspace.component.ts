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
  regarrays: Regarray[];

  public uploader:FileUploader = new FileUploader({url:NODEUPLOAD+'upload/'});
  nodeupload=NODEUPLOAD;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {

  }

  getRegarrays(): void {
    this.heroService
      .getRegs()
      .then(regarrays => {
        //regarrays.forEach((h:Regarray)=>{h.status=this.statustype.find(st=>st.statuscode==h.statuscode).status});
        this.regarrays = regarrays;
      })
      .catch(error => this.error = error);
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
            
            let resobj = JSON.parse(response);
            element.enable=true;
            element.encoding='binary';
            element.filename=resobj.filename;
            element.path=resobj.path;
            element.createTime=resobj.createTime;
            // element.id=this.workspace.files.length + 1;
            element.convFlag=false;
            let tmp=element.path.replace(/uploads/,this.workspace.path);
            tmp=tmp.replace(/\-[0-9]*/,'');
            element.convPath=tmp;
            //console.log(element);
            if(this.workspace.files[0]){
              this.workspace.files.push(element);
            }
            else{
              this.workspace.files=[element];
            }
        }  
      };

    this.getRegarrays();
    
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

  delAll(event:any): void{
      // console.log(this.workspace.files);
      this.workspace.files=[];
      this.delConvAll();
      // console.log(this.workspace.files);
  }

  zipAll(event:any): void{
      // console.log(this.workspace.files);
      this.heroService.getDownload(this.workspace)
          .then(res => {this.workspace = res;alert('Zip Done!');});

      // console.log(this.workspace.files);
  }

  delConvAll(): void{
      // console.log(this.workspace.files);
      this.workspace.files.forEach(file => this.delConv(file));
      //this.workspace.files.splice(this.workspace.files.indexOf(files), 1);
      // console.log(this.workspace.files);
  }

  delConv(file:File): void{
      // console.log(this.workspace.files);
      let f = this.workspace.files.findIndex(element => element == file);
      this.heroService.deleteConvFile(file)
          .then(res => this.workspace.files[f] = res);
      //this.workspace.files.splice(this.workspace.files.indexOf(files), 1);
      // console.log(this.workspace.files);
  }

  delAttach(files:File,event:any): void{
      // console.log(this.workspace.files);
      this.workspace.files.splice(this.workspace.files.indexOf(files), 1);
      // console.log(this.workspace.files);
  }

  convAll(event:any): void{
    this.workspace.files.forEach(file=>this.convFile(file));
  }

  convFile(file:File): void{
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

  selectRegs(regs:Regarray[],event:any): void{
      let cc=regs.filter(reg=>reg.enable===true);
      this.workspace.regs=this.workspace.regs.concat(cc);
      //console.log(cc);
      //console.log(this.workspace.regs);
      //console.log(regs);
      //console.log(this.regarrays);
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
