import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Workspace,Regarray,File,Good,GoodType,Cart,User,GoodsDetails } from './hero';
import { HeroService } from './hero.service';
import { CATEGORIES,NODEUPLOAD } from './mock-data';
import { WORKSPACEPAGE } from './page-workspace';
import {MdDialog, MdDialogRef} from '@angular/material';
// import { OrderList } from './orderlist';

@Component({
  moduleId: module.id,
  selector: 'my-workspace',
  templateUrl: 'workspace.component.html',
  styleUrls: ['workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  page=WORKSPACEPAGE.find(page=>page.id == 1);

  // @Input() workspace: Workspace;
  // @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  regarrays: Regarray[];
  token:User=JSON.parse(localStorage.getItem('rapper_token'));
  nodeupload=NODEUPLOAD;
  workspace: Workspace;
  goods: Good[];
  giftgoods: Good[];
  goodtypes:GoodType[]=[];
  gifttypes:GoodType[]=[];
  curtypeid:number;
  curgiftid:number;
  foods:Good[];
  giftfoods:Good[];
  cart:Cart;
  giftcart:Cart;
  orderSub:boolean=false;
  goodshow:boolean=true;
  fooddetail:GoodsDetails[];

  innerHeight: number;
  innerWidth: number;
  listHeight: number;

  links=['a','b','c'];
  messages=['d','e','f'];
  folders=['g','h','i'];
  notes=['j','k','l'];

  constructor(
    public dialog: MdDialog,
    private heroService: HeroService,
    private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.initWorkspace();  
    this.innerHeight=window.screen.height;
    this.listHeight=this.innerHeight*0.7;
    console.log(window.screen.height);
  }

  initWorkspace():void{
    this.route.params.forEach((params: Params) => {
      // if (params['id'] !== undefined) {return};
      let id = params['id'];
      this.heroService.getWorkspace(id)
        .then(workspace => {
          this.workspace = workspace;
          this.getCart(workspace);
          this.getGoods(workspace);
          if (this.token.rights.indexOf("赠送")>0){
            this.getGiftCart(workspace);
          }
        })
        .catch(error => this.error = error); 

      if (this.token.rights.indexOf("赠送")>0){
        this.getGift(id,this.token);
      }
     });
  }


  getGift(roomID:string,token:User):void{
    this.heroService.getGift(roomID,token)
        .then(goods => {
          // console.log(goods);
          // console.log(this.gifttypes);
          this.giftgoods = goods;
          
          let goodlsit= new Set();
          goods.forEach(g=>{
            let gt= new GoodType();
            gt.id=g.DisplayOrder;
            gt.GoodsTypeName=g.GoodsTypeName;
            goodlsit.add(JSON.stringify(gt));
            // this.goodtypes[g.DisplayOrder-1]=gt;
            // console.log(this.gifttypes);

          }); 
          goodlsit.forEach(u=>this.gifttypes.push(JSON.parse(u)));
          if(!this.curgiftid){
            this.curgiftid=this.gifttypes[0].id
          }
          this.giftfoods = goods.filter(g=>g.DisplayOrder===this.curgiftid);
          // console.log(this.gifttypes);
        })
        .catch(error => this.error = error);  
  }

  addOrder(cart:Cart):void{
    this.orderSub=true;
    console.log(cart);
    this.heroService.submitCart(cart)
        .then(c => { 
          if (c){
            alert(c);
          }else{
            cart.SubmitOrders.forEach(s=>this.deleteCart(s,cart));
            this.foods.forEach(f=>f.GoodsCount=0);
            let body = JSON.stringify(this.cart);
            localStorage.setItem('base_cart', body);
          } 
          this.orderSub=false;
          this.initWorkspace();  
        })
        .catch(error => this.error = error); 

  }

  getGoods(wk:Workspace):void{
    this.heroService.getGoods(wk)
        .then(goods => {
          // console.log(goods);
          this.goods = goods;
          
          let goodlsit= new Set();
          goods.forEach(g=>{
            let gt= new GoodType();
            gt.id=g.DisplayOrder;
            gt.GoodsTypeName=g.GoodsTypeName;
            goodlsit.add(JSON.stringify(gt));
            // this.goodtypes[g.DisplayOrder-1]=gt;

          }); 
          goodlsit.forEach(u=>this.goodtypes.push(JSON.parse(u)));
          if(!this.curtypeid){
            this.curtypeid=this.goodtypes[0].id
          }
      
          this.foods = goods.filter(g=>g.DisplayOrder===this.curtypeid);
          console.log(this.goodtypes);
        })
        .catch(error => this.error = error); 
  }

  getCart(wk:Workspace): void {
    this.heroService.getCart(wk)
        .then(c => { this.cart = c ;
          console.log(c);})
        .catch(error => this.error = error); 
  }

  getGiftCart(wk:Workspace): void {
    this.heroService.getGiftCart(wk)
        .then(c => { this.giftcart = c ;
          console.log(c);})
        .catch(error => this.error = error); 
  }



  addCart(select:Good,cartin:Cart): void {
    let flag = false;
    let sum = 0;
    cartin.SubmitOrders.forEach(function (gd, i) {
      if(gd.ID === select.ID) {
        gd.GoodsCount = (gd.GoodsCount || 0) + 1 ;
        select.GoodsCount=gd.GoodsCount;
        // gd.chili = true;
        flag = true;
      }
      sum+=  (gd.GoodsCount || 0) * gd.Price      
    });
    if(!flag) {
      select.GoodsCount += 1;
      sum += select.GoodsCount  * select.Price;
      cartin.SubmitOrders.push(select);
    }
    cartin.Sum = sum;
    let body = JSON.stringify(cartin);
    localStorage.setItem(cartin.storename, body);
  }

  removeCart(select:Good,cartin:Cart): void {
    let flag = false;
    let sum = 0;
    cartin.SubmitOrders.forEach(function (gd, i) {
      if(gd.ID === select.ID) {
        gd.GoodsCount = (gd.GoodsCount || 0) - 1 ;
        if (gd.GoodsCount < 0) gd.GoodsCount = 0;
        select.GoodsCount=gd.GoodsCount;
        flag = true;
      }
      sum+=  (gd.GoodsCount || 0) * gd.Price      
    });
    if(!flag) {
      select.GoodsCount -= 1;
      if (select.GoodsCount < 0) select.GoodsCount = 0;
      sum += select.GoodsCount  * select.Price;
      cartin.SubmitOrders.push(select);
    }
    cartin.Sum = sum;
    let body = JSON.stringify(cartin);
    localStorage.setItem(cartin.storename, body);
  }

  deleteCart(select:Good,cartin:Cart): void {
    let sum = 0;
    cartin.SubmitOrders.forEach(function (gd, i) {
      if(gd.ID === select.ID) {
        gd.GoodsCount = 0 ;
        select.GoodsCount=gd.GoodsCount;
      }
      sum+=  (gd.GoodsCount || 0) * gd.Price      
    });
    cartin.Sum = sum;
    let body = JSON.stringify(cartin);
    localStorage.setItem(cartin.storename, body);
  }


  selectType(select:GoodType): void {
    this.curtypeid = select.id;
    this.foods = this.goods.filter(g=>g.DisplayOrder===select.id);
  }

  selectGiftType(select:GoodType): void {
    this.curgiftid = select.id;
    this.giftfoods = this.giftgoods.filter(g=>g.DisplayOrder===select.id);
  }

  goBack(savedHero: Workspace = null): void {
    // this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }

  listGoods(select:boolean,event:any):void{
    
    console.log(event.tab.textLabel);
    select=true;
    if (event.tab.textLabel==="赠送"){
      select=false;

    }
    this.goodshow=select;
    
  }

  // listGifts(select:boolean):void{
  //   console.log(select);
  //   select=false;
  // }
    setPackage(select:Good,cartin:Cart): void {
    // let flag = false;
    // let sum = 0;
    console.log(select);
    let dialogRef = this.dialog.open(PackageDialog);
    let instance = dialogRef.componentInstance;
    select.GoodsDetails.forEach(g=>{if(!g.GroupLimit){g.GroupLimit=g.GroupCount}});
    instance.packagefood=select;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      select=instance.packagefood;
    });
    // cartin.SubmitOrders.forEach(function (gd, i) {
    //   if(gd.ID === select.ID) {
    //     gd.GoodsCount = (gd.GoodsCount || 0) + 1 ;
    //     select.GoodsCount=gd.GoodsCount;
    //     // gd.chili = true;
    //     flag = true;
    //   }
    //   sum+=  (gd.GoodsCount || 0) * gd.Price      
    // });
    // if(!flag) {
    //   select.GoodsCount += 1;
    //   sum += select.GoodsCount  * select.Price;
    //   cartin.SubmitOrders.push(select);
    // }
    // cartin.Sum = sum;
    // let body = JSON.stringify(cartin);
    // localStorage.setItem(cartin.storename, body);
  }
}


@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './packagedialog.html',
})
export class PackageDialog {
  packagefood:Good;
  constructor(public dialogRef: MdDialogRef<PackageDialog>) {}

  addPackage(select:GoodsDetails): void {
    select.GoodsDetailCount += 1;
    this.packagefood.GoodsDetails.forEach(p=>{if(p.GroupName===select.GroupName){p.GroupLimit-=1}});
  }

  removePackage(select:GoodsDetails): void {
    select.GoodsDetailCount -= 1;
    this.packagefood.GoodsDetails.forEach(p=>{if(p.GroupName===select.GroupName){p.GroupLimit+=1}});
  }
}