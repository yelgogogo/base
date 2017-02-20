import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeroService } from './hero.service';
import { LOGINPAGE } from './page-login';
import { User } from './hero';
import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';
// import { contentHeaders } from '../common/headers';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: [ 'login.css' ]
})
export class Login implements OnInit,OnDestroy{
  page=LOGINPAGE.find(page=>page.id == 1);
  user:User;

  subscription: Subscription;

  constructor(public router: Router, public http: Http, private heroService: HeroService, private missionService: MissionService) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.page=LOGINPAGE.find(page=>page.id == mission);
    });
  }


  ngOnInit(): void {
    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=LOGINPAGE.find(page=>page.id == languageid);
    }
    this.user= new User();
  }

  login(event: any, user:string, password:string) {
    event.preventDefault();
    
    this.user.username=user;
    this.user.password=password;
    
    this.heroService.getUserByName(this.user)
      .then(useri => 
        {
          this.user=useri;
          this.user.username = user;
          let body = JSON.stringify(this.user);
          localStorage.setItem('rapper_token', body);
          console.log('login');
          this.router.navigate(['workarea']);

        });
  }

  signup(event: any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}