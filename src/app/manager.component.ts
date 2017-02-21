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
  cData2:any[];

  pieTitle={area:'',amount:0};

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
    //this.doughnutChartLabels = ['已收款 ¥'+this.doughnutChartData[0], '预计未收款 ¥'+this.doughnutChartData[1]];
    this.barChartData=this.cData;
    let clone = JSON.parse(JSON.stringify(this.cData));
    this.pieTitle.area=sel;
    switch (sel) {
      case '全部':
        this.pieTitle.amount=this.manager.PosFinallyAmount;
        break;
      case '包房':
        this.pieTitle.amount=this.manager.PosedRoomAmount;
        this.doughnutChartData=[this.manager.PosedRoomAmount,this.manager.PosingAmount];

        clone.forEach(data=>{
          if (data.label !==sel){data.data=[0, 0, 0, 0]};
          });
        this.barChartData = clone;
        break;
      case '大厅':  
        this.pieTitle.amount=this.manager.PosedHallAmount;  
        this.doughnutChartData=[this.manager.PosedHallAmount,0];
           
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
          this.barChartLabels=['房间总数','当前开台', '累计开台','已经结帐' ];
          this.cLabel=['全部', '大厅','包房'];
          this.cData= [
            {data: [this.manager.HallTotal,this.manager.HallOpen, this.manager.HallOpenTotal, this.manager.HallPosed], label: '大厅'},
            {data: [ this.manager.RoomTotal,this.manager.RoomOpen, this.manager.RoomOpenTotal, this.manager.RoomPosed], label: '包房'}];
            this.cData2= [
            {data:  [
                      this.manager.PosFinallyAmount,
                      this.manager.PosingAmount, 
                      this.manager.PosedAmount, 
                      this.manager.PosedHallAmount, 
                      this.manager.PosedRoomAmount, 
                      this.manager.PresentAmount, 
                      this.manager.PresentAmountEmp, 
                      this.manager.PresentAmountCompany
                    ], label: '大厅'}];
          this.doughnutChartData=[this.manager.PosedAmount,this.manager.PosingAmount];
          // console.log(this.manager);
          this.barChartData=this.cData;
          this.barChartData2=this.cData2;
          this.pieTitle.area='全部';
          this.pieTitle.amount=this.manager.PosFinallyAmount;
        })
        .catch(error => this.error = error); 
    }

//-------------chart---------------
   public barChartOptions:any = {
     title: {
            display: true,
            fontSize:18,
            text: '房台统计'
        },
     tooltips :{
       titleFontSize:18,
       bodyFontSize:18,
     },
     animation: {
      duration: 500,
      onComplete: function () {
          // render the value of the chart above the bar
          var ctx = this.chart.ctx;
          //ctx.font = this.chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
          ctx.fillStyle = this.chart.config.options.defaultFontColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length ; i++) {
                  if ( dataset.data[i] > 0) 
                  {var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                      
                              ctx.fillText(dataset.data[i], model.x, model.y - 5);}
              }
          });
      }},
    responsive: true
  };
  public barChartLabels:string[] = ['房间总数','当前开台', '累计开台','已经结帐'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [0, 0, 0, 0], label: '大厅'}
    ,
    {data: [0, 0, 0, 0], label: '包房'}
    ];
 //-------------chart2---------------
   public barChartOptions2:any = {
     title: {
            display: true,
            fontSize:18,
            text: '房台统计'
        },
     legend:{display:true,labels:{fontSize:18}},
     tooltips :{
       titleFontSize:18,
       bodyFontSize:18
     },
     scales :{
       xAxes:[{
         ticks:{

           fontSize:18
         }
       }],
       yAxes:[{
         ticks:{

           fontSize:18
         }
       }],
       pointLabel:{fontSize:18},
       titleFontSize:18,
       fontSize:18,
       bodyFontSize:18
     },
     fontSize:18,
     animation: {
      duration: 500,
      onComplete: function () {
          // render the value of the chart above the bar
          var ctx = this.chart.ctx;
          //ctx.font = this.chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
          ctx.fillStyle = this.chart.config.options.defaultFontColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length ; i++) {
                  if ( dataset.data[i] > 0) 
                  {var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                      
                              ctx.fillText(dataset.data[i], model.x, model.y + 10);}
              }
          });
      }},
    responsive: true
  };
  public barChartLabels2:string[] = ['预计收款','预计未收款','已收款','大厅收款', '包房收款','赠送合计','员工赠送','公司例送'];
  public barChartType2:string = 'horizontalBar';
  public barChartLegend2:boolean = true;
 
  public barChartData2:any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0], label: '大厅'}
    // ,
    // {data: [0, 0, 0, 0, 0, 0, 0, 0], label: '包房'}
    ];
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  // public randomize():void {
  //   // Only Change 3 values
  //   let data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  //  }
//-------------pie---------------
  // Doughnut
  public doughnutChartLabels:string[] = ['已收款', '未收款'];
  public doughnutChartData:number[] = [0, 0];
  public doughnutChartType:string = 'doughnut';
   public doughnutOptions:any = { };

  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
 
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

}
