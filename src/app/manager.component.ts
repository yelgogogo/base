import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Manager } from './hero';
import { HeroService } from './hero.service';
import { REGSPAGE } from './page-manager';
// import { STATUSTYPE } from './mock-data';

@Component({
  selector: 'my-manager',
  templateUrl: 'manager.component.html',
  styleUrls: ['manager.component.css']
})
export class ManagerComponent implements OnInit {
  page=REGSPAGE.find(page=>page.id == 1);
  
  error: any;
  // statustype = STATUSTYPE.filter(statusType=>statusType.id == 1);
  manager:Manager;
  cLabel:any[];
  cData:any[];
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  ngOnInit(): void {
    

    if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=REGSPAGE.find(page=>page.id == languageid);
      //this.statustype=REGSPAGE.filter(statustype=>statustype.id == languageid);
    }
    
    this.getManager('x');
    
  }

  selectLabel(sel:string):void{
    // console.log(this.cData);
    // console.log(this.cData.filter(f=>f.label===sel));
    
    this.barChartData=this.cData;
    let clone = JSON.parse(JSON.stringify(this.cData));
    switch (sel) {
      case "全部":
        break;
      case "包房":
        this.doughnutChartData=[this.manager.RoomPosed,(this.manager.RoomTotal-this.manager.RoomPosed)];
        clone.forEach(data=>{
          if (data.label !==sel){data.data=[0, 0, 0, 0]};
          });
        this.barChartData = clone;
        break;
      case "大厅":    
        this.doughnutChartData=[this.manager.HallPosed,(this.manager.HallTotal-this.manager.HallPosed)];
           
        clone.forEach(data=>{
          if (data.label !==sel){data.data=[0, 0, 0, 0]};
          });
        this.barChartData = clone;
        break;
    }

  }

  getManager(wk:string): void {
    this.heroService.getManager()
        .then(c => { this.manager = c[0];
          this.barChartLabels=['累计开台', '累计开台','当前开台', '已经结帐'];
          this.cLabel=['全部', '大厅','包房'];
          this.cData= [
    {data: [this.manager.HallOpen, this.manager.HallOpenTotal, this.manager.HallPosed, this.manager.HallTotal], label: '大厅'},
    {data: [this.manager.RoomOpen, this.manager.RoomOpenTotal, this.manager.RoomPosed, this.manager.RoomTotal], label: '包房'}];
    this.doughnutChartData=[this.manager.PosedAmount,this.manager.PosingAmount];
    // console.log(this.manager);
    // console.log(this.cData);
    this.barChartData=this.cData; 
        })
        .catch(error => this.error = error); 
    }

//-------------chart---------------
   public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['累计开台', '累计开台','当前开台', '已经结帐'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [0, 0, 0, 0], label: '大厅'}
    ,
    {data: [0, 0, 0, 0], label: '包房'}
    ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
   }
//-------------pie---------------
  // Doughnut
  public doughnutChartLabels:string[] = ['已收款', '预计未收款'];
  public doughnutChartData:number[] = [0, 0];
  public doughnutChartType:string = 'doughnut';
 
  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
 
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

}
