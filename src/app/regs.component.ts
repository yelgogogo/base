import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Regarray } from './hero';
import { HeroService } from './hero.service';
import { REGSPAGE } from './page-regs';
// import { STATUSTYPE } from './mock-data';

@Component({
  moduleId: module.id,
  selector: 'my-regs',
  templateUrl: 'regs.component.html',
  styleUrls: ['regs.component.css']
})
export class RegsComponent implements OnInit {
  page=REGSPAGE.find(page=>page.id == 1);
  
  regarrays: Regarray[];
  selectedRegarray: Regarray;
  addingRegarray = false;
  latestid = 18;
  error: any;
  // statustype = STATUSTYPE.filter(statusType=>statusType.id == 1);

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getRegarrays(): void {
    this.heroService
      .getRegs()
      .then(regarrays => {
        //regarrays.forEach((h:Regarray)=>{h.status=this.statustype.find(st=>st.statuscode==h.statuscode).status});
        this.regarrays = regarrays;
      })
      .catch(error => this.error = error);
  }

  addRegarray(): void {
    this.addingRegarray = true;
    this.selectedRegarray = null;
  }

  close(savedRegarray: Regarray): void {
    this.addingRegarray = false;
    if (savedRegarray) { this.getRegarrays(); }
  }

  deleteRegarray(regarray: Regarray, event: any): void {
    event.stopPropagation();
    this.heroService
      .deleteReg(regarray)
      .then(res => {
        this.regarrays = this.regarrays.filter(h => h !== regarray);
        if (this.selectedRegarray === regarray) { this.selectedRegarray = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    

    if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=REGSPAGE.find(page=>page.id == languageid);
      //this.statustype=REGSPAGE.filter(statustype=>statustype.id == languageid);
    }

    this.getRegarrays();

    
  }

  onSelect(regarray: Regarray): void {
    this.selectedRegarray = regarray;
    this.addingRegarray = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/regdetail', this.selectedRegarray.id]);
  }
}
