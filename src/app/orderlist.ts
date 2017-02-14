import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { HeroSearchService } from './hero-search.service';
import { Order,Workspace } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'orderlist',
  templateUrl: 'orderlist.html',
  styleUrls: ['orderlist.css']
  // providers: [HeroSearchService]
})
export class OrderList implements OnInit {
  orders:Order[];
  @Input() workspace:Workspace;
  // heroes: Observable<Hero[]>;
  // private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  // search(term: string): void {
  //   // Push a search term into the observable stream.
  //   this.searchTerms.next(term);
  // }

  ngOnInit(): void {
    this.heroService.getOrders()
      .then(orders => this.orders = orders);

    // if(localStorage.getItem('wic_language') ){
    //   let languageid=localStorage.getItem('wic_language');
    //   this.page=DASHPAGE.find(page=>page.id == languageid);
    // }
  }

  // gotoDetail(engineer: Engineer): void {
  //   let link = ['/engineer', engineer.id];
  //   this.router.navigate(link);
  // }
  
}
