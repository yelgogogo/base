import { Component, EventEmitter, Input, OnInit, Output,OnDestroy } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
// import { Location } from '@angular/common';
import { Workspace,Regarray,File,Good,GoodType,Cart,User,GoodsDetails } from './hero';
import { HeroService } from './hero.service';
import { CATEGORIES,NODEUPLOAD } from './mock-data';
import { WORKSPACEPAGE } from './page-workspace';
import {MdDialog, MdDialogRef} from '@angular/material';
import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';
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
  savegoods: Good[];
  goodtypes:GoodType[]=[];
  gifttypes:GoodType[]=[];
  savetypes:GoodType[]=[];
  curtypeid:number;
  curgiftid:number;
  cursaveid:number;
  foods:Good[];
  giftfoods:Good[];
  savefoods:Good[];
  cart:Cart;
  giftcart:Cart;
  savecart:Cart;
  orderSub:boolean=false;
  goodshow:number=1;
  // saveshow:boolean=false;
  fooddetail:GoodsDetails[];
  gridcol:number;

  subscription: Subscription;
  nightmode=false; 
  innerHeight: number;
  innerWidth: number;
  listHeight: number;

  constructor(
    public dialog: MdDialog,
    private heroService: HeroService,
    public router: Router,
    // private location: Location,
    private route: ActivatedRoute, 
    private missionService: MissionService) {
    this.subscription = missionService.modeChanged$.subscribe(
      mission => {
        // this.page=LOGINPAGE.find(page=>page.id == mission);
        this.nightmode=mission;
    });

  }


  ngOnInit(): void {
    this.initWorkspace();  
    this.innerHeight=window.screen.height;
    this.innerWidth=window.screen.width;
    this.listHeight=this.innerHeight*0.8;
    this.gridcol=Math.floor(this.innerWidth*0.75/135);
    this.nightmode=this.missionService.share;
    // //console.log(window.screen.height);
    // //console.log(this.gridcol);
  }

  initWorkspace():void{
    this.savecart=new Cart();
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
          if (this.token.rights.indexOf("存酒")>0){
            this.getSaveCart(workspace);
          }
        })
        .catch(error => this.error = error); 

      if (this.token.rights.indexOf("存酒")>0){
        this.goodshow=2;
        this.getSave(id,this.token);
        
      }

      if (this.token.rights.indexOf("赠送")>0){
        this.goodshow=0;
        this.getGift(id,this.token);
      }

      
     });
  }

  changSave(select:Good,cartin:Cart,event:any):void{
    if (event.checked){
      this.addCart(select,cartin);
    }else{
      this.removeCart(select,cartin);
    }
    console.log(this.savecart);
  }

  show(event:any):void{
    // event.stopPropagation();
    // console.log(event);
  }

  goBack():void{
    this.router.navigate(['workarea']);
  }

  getSave(roomID:string,token:User):void{
    this.heroService.getSave(roomID,token)
        .then(goods => {
          // //console.log(goods);
          // //console.log(this.gifttypes);
          this.savegoods = goods;
          
          let goodlsit= new Set();
          goods.forEach(g=>{
            let gt= new GoodType();
            gt.id=g.DisplayOrder;
            gt.GoodsTypeName=g.GoodsTypeName;
            goodlsit.add(JSON.stringify(gt));
            // this.goodtypes[g.DisplayOrder-1]=gt;
            // //console.log(this.gifttypes);

          }); 
          goodlsit.forEach(u=>this.savetypes.push(JSON.parse(u)));
          if(!this.cursaveid){
            this.cursaveid=this.savetypes[0].id
          }
          this.savefoods = goods.filter(g=>g.DisplayOrder===this.cursaveid);
          // //console.log(this.gifttypes);
        })
        .catch(error => this.error = error);  
  }

  getGift(roomID:string,token:User):void{
    this.heroService.getGift(roomID,token)
        .then(goods => {
          // //console.log(goods);
          // //console.log(this.gifttypes);
          this.giftgoods = goods;
          
          let goodlsit= new Set();
          goods.forEach(g=>{
            let gt= new GoodType();
            gt.id=g.DisplayOrder;
            gt.GoodsTypeName=g.GoodsTypeName;
            goodlsit.add(JSON.stringify(gt));
            // this.goodtypes[g.DisplayOrder-1]=gt;
            // //console.log(this.gifttypes);

          }); 
          goodlsit.forEach(u=>this.gifttypes.push(JSON.parse(u)));
          if(!this.curgiftid){
            this.curgiftid=this.gifttypes[0].id
          }
          this.giftfoods = goods.filter(g=>g.DisplayOrder===this.curgiftid);
          // //console.log(this.gifttypes);
        })
        .catch(error => this.error = error);  
  }

  addOrder(cart:Cart):void{
    this.cart.CartDone=false;
    ////console.log(cart);
    this.heroService.submitCart(cart)
        .then(c => { 
          if (c){
            alert(c);
          }else{
            // this.clearCart(cart);
            cart.SubmitOrders.forEach(s=>this.deleteCart(s,cart));
            // this.foods.forEach(f=>f.GoodsCount=0);
            let body = JSON.stringify(this.cart);
            localStorage.setItem('base_cart', body);
          } 
          this.cart.CartDone=true;
          this.initWorkspace();  
        })
        .catch(error => this.error = error); 

  }

  getGoods(wk:Workspace):void{
    this.heroService.getGoods(wk)
        .then(goods => {
          // //console.log(goods);
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
          //console.log(this.goodtypes);
        })
        .catch(error => this.error = error); 
  }

getSaveCart(wk:Workspace):void {
  let cartdata= new Cart();
      cartdata.storename='base_savecart';
      cartdata.roomID = wk.ID;
      cartdata.Sum = 0; 
      cartdata.RoomCode = wk.RoomCode; 
      cartdata.RoomOpCode = wk.RoomOpCode;
      cartdata.RoomName = wk.RoomName; 
      cartdata.RoomTypeName = wk.RoomTypeName;   
      cartdata.SubmitOrders = []; 
      cartdata.userNo=JSON.parse(localStorage.getItem('rapper_token')).username;
      cartdata.cardNo='';
      cartdata.isPresent=false;
      cartdata.orderType='落单';
      cartdata.CartDone=true;
      this.savecart=cartdata;
    
  }

  getCart(wk:Workspace): void {
    this.heroService.getCart(wk)
        .then(c => { this.cart = c ;
          //console.log(c);
        })
        .catch(error => this.error = error); 
  }

  getGiftCart(wk:Workspace): void {
    this.heroService.getGiftCart(wk)
        .then(c => { this.giftcart = c ;
          //console.log(c);
        })
        .catch(error => this.error = error); 
  }

  addInCart(select:Good,cartin:Cart): void {
    let sum = 0;
    cartin.SubmitOrders.forEach(function (gd, i) {
      if(gd.ID === select.ID) {
        gd.GoodsCount = (gd.GoodsCount || 0) + 1 ;
        select.GoodsCount=gd.GoodsCount;
      }
      sum+=  (gd.GoodsCount || 0) * gd.Price      
    });

    cartin.Sum = sum;
    let body = JSON.stringify(cartin);
    localStorage.setItem(cartin.storename, body);
  }

  checkCart(cartin:Cart):boolean {
    
    let rtn=false;
    if(cartin.CartDone){
      cartin.SubmitOrders.forEach(o=>{
        if (!o.GoodsDetailsDone){
          rtn= true;
        }
      });
    }else{
      rtn= true;
    }
    //console.log(cartin);
    //console.log(rtn);
    return rtn;
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
    }else{
      cartin.SubmitOrders=cartin.SubmitOrders.filter(f=>f.ID!==select.ID);
      cartin.SubmitOrders.push(select);
    }
    cartin.Sum = sum;
  
    // cartin.CartDone=select.GoodsDetailsDone;
 
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
    cartin.SubmitOrders=cartin.SubmitOrders.filter(f=>f.GoodsCount>0);
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
    cartin.SubmitOrders=cartin.SubmitOrders.filter(f=>f.GoodsCount>0);
    cartin.Sum = sum;
    let body = JSON.stringify(cartin);
    localStorage.setItem(cartin.storename, body);
  }

  clearCart(cartin:Cart): void {
    // cartin.SubmitOrders=[];
    
    cartin.SubmitOrders.forEach(s=>this.deleteCart(s,cartin));
    cartin.Sum = 0;
    // foodin.forEach(f=>f.GoodsCount=0);
    let body = JSON.stringify(cartin);
    localStorage.setItem(cartin.storename, body);
  }

  selectType(select:GoodType): void {
    this.curtypeid = select.id;
    this.foods = this.goods.filter(g=>g.DisplayOrder===select.id);
  }

  selectSaveType(select:GoodType): void {
    this.cursaveid = select.id;
    this.savefoods = this.savegoods.filter(g=>g.DisplayOrder===select.id);
  }

  selectGiftType(select:GoodType): void {
    this.curgiftid = select.id;
    this.giftfoods = this.giftgoods.filter(g=>g.DisplayOrder===select.id);
  }

  // goBack(): void {
  //   // this.close.emit(savedHero);
  //   //console.log("go back");
  //   if (this.navigated) { window.history.back(); }
  // }

  listGoods(select:number,event:any):void{
    
    //console.log(event.tab.textLabel);
    
    switch (event.tab.textLabel) {
      case "赠送":
        select=0;
        break;
      case "存酒":
        select=2;
        break;
      default:
        select=1;
        break;
    }
    this.goodshow=select;
    
  }

  // listGifts(select:boolean):void{
  //   //console.log(select);
  //   select=false;
  // }
    setPackage(select:Good,cartin:Cart): void {
    // let flag = false;
    // let sum = 0;
    //console.log(select);
    let dialogRef = this.dialog.open(PackageDialog);
    let instance = dialogRef.componentInstance;
    
    instance.packagefood=select;
    dialogRef.afterClosed().subscribe(result => {
      
      select=instance.packagefood;
      let limtcount=0;
      select.GoodsDetails.forEach(c=>limtcount +=c.GroupLimit);
      if (limtcount === 0){
        select.GoodsDetailsDone=true;
      }else{
        select.GoodsDetailsDone=false;
      }
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