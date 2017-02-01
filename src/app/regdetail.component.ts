import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Regarray,Engineer,Survey,findReg } from './hero';
import { HeroService } from './hero.service';
import { REGATTR,NODEUPLOAD } from './mock-data';
import { REGDETAILPAGE } from './page-regdetail';

@Component({
  moduleId: module.id,
  selector: 'my-regdetail',
  templateUrl: 'regdetail.component.html',
  styleUrls: ['regdetail.component.css']
})
export class RegDetailComponent implements OnInit {
  page = REGDETAILPAGE.find(page=>page.id == 1);
  nodeupload=NODEUPLOAD;

  survey:Survey;
  @Input() regarray: Regarray;
  @Output() close = new EventEmitter();
  error: any;
  attrchange:string='';
  navigated = false; // true if navigated here
  engineers:Engineer[];
  selectedScopeAttr :any = 0;
  selectedFindAttr :any = 0;

  regattr = REGATTR.filter(regAttr=>regAttr.id == 1); 
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=REGDETAILPAGE.find(page=>page.id == languageid);
      this.regattr=REGATTR.filter(regattr=>regattr.id == languageid);
    }

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getRegarray(id)
            .then(regarray => this.regarray = regarray);
      } else {
        this.navigated = false;
        this.regarray = new Regarray();
        this.regarray.name = '';
        this.regarray.description = '';
        this.regarray.owner = JSON.parse(localStorage.getItem('rapper_token')).name;
        this.regarray.enable = false;
        this.regarray.regScopeAttr={id:2,value:'g',name:'Global'};
        this.regarray.findArray = [];
        let empfind = new findReg();
        empfind.regFindAttr={id:2,value:'g',name:'Global'};
        this.regarray.findArray.push(empfind);
        let today= new  Date();
        this.regarray.createTime = today.toLocaleString();
      }
    });

  }

  addFindArr(event:any):void {
    let empfind = new findReg();
    empfind.regFindAttr={id:2,value:'g',name:'Global'};
    this.regarray.findArray.push(empfind);
  }

  updateScopeAttr(selected:any):void {
      // this.regarray.regScopeAttr=selected.value;
  }

  updateFindAttr(selected:any):void {
    // console.log(selected);
    // console.log(this.regarray.findArray);
      //this.regarray.regFindAttr=selected.value;
  }

  save(): void {
    console.log(this.regarray);
    let today= new  Date();
    this.regarray.updateTime = today.toLocaleString();
    this.heroService
        .saveRegarray(this.regarray)
        .then(regarray => {
          this.regarray = regarray; // saved regarray, w/ id if new
          this.goBack(regarray);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedRegarray: Regarray = null): void {
    this.close.emit(savedRegarray);
    if (this.navigated) { window.history.back(); }
  }
}
