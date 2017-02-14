import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Workspace,Regarray,File,Good,GoodType,Cart } from './hero';
import { HeroService } from './hero.service';
import { CATEGORIES,NODEUPLOAD } from './mock-data';
import { WORKSPACEPAGE } from './page-workspace';

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
  token:string=JSON.parse(localStorage.getItem('rapper_token')).name;
  nodeupload=NODEUPLOAD;
  workspace: Workspace;
  goods: Good[];
  goodtypes:GoodType[]=[];
  curtypeid:number=1;
  foods:Good[];
  cart:Cart;

  links=['a','b','c'];
  messages=['d','e','f'];
  folders=['g','h','i'];
  notes=['j','k','l'];

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // if (params['id'] !== undefined) {return};
      let id = params['id'];
      this.heroService.getWorkspace(id)
        .then(workspace => {
          this.workspace = workspace;
          this.getCart(workspace);
        })
        .catch(error => this.error = error); 
      });

    

    this.heroService.getGoods()
        .then(goods => {
          this.goods = goods;
          this.foods = goods.filter(g=>g.DisplayOrder===this.curtypeid);
          goods.forEach(g=>{
            let gt= new GoodType();
            gt.id=g.DisplayOrder;
            gt.GoodsTypeName=g.GoodsTypeName;
            this.goodtypes[g.DisplayOrder-1]=gt;
          }); 
        })
        .catch(error => this.error = error); 

  }

  getCart(wk:Workspace): void {
    this.heroService.getCart(wk)
        .then(c => { this.cart = c })
        .catch(error => this.error = error); 
  }

  addCart(select:Good): void {
    
    let flag = false;
    console.log(select);
    let sum = 0;
    
    this.cart.goods.forEach(function (gd, i) {
      if(gd.ID === select.ID) {
        gd.GoodsCount = (gd.GoodsCount || 0) + 1 ;
        // gd.chili = true;
        flag = true;
      }
      console.log(select);
      sum+=  (gd.GoodsCount || 0) * gd.Price      
    });
    if(!flag) {
      console.log(select);
      select.GoodsCount += 1;
      // goods.chili = true;
      // let tmp:Good =select;
      sum += select.GoodsCount  * select.Price;
      this.cart.goods.push(select);
      console.log(select);
    }
    this.cart.Sum = sum;
    console.log(this.cart);
  }

  selectType(select:GoodType): void {
    this.foods = this.goods.filter(g=>g.DisplayOrder===select.id);
  }

  goBack(savedHero: Workspace = null): void {
    // this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
}
