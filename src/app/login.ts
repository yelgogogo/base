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
  remember=false;
  userstore:User;
  nightmode=false;

  subscription: Subscription;

  constructor(public router: Router, public http: Http, private heroService: HeroService, private missionService: MissionService) {
    this.subscription = missionService.modeChanged$.subscribe(
      mission => {
        // this.page=LOGINPAGE.find(page=>page.id == mission);
        this.nightmode=mission;
    });

  }


  ngOnInit(): void {
    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=LOGINPAGE.find(page=>page.id == languageid);
    }

    this.user= new User();

    if(localStorage.getItem('rapper_token')){
      this.userstore=JSON.parse(localStorage.getItem('rapper_token'));
      console.log(this.userstore);
      if (this.userstore.remember){
        this.user=  this.userstore;
        this.remember=true;
      }    
    }
    this.nightmode=this.missionService.share;
    console.log(this.missionService.modeChanged$);
    console.log(this.missionService.share);
  }

  login(event: any, user:string, password:string) {
    event.preventDefault();
    
    this.user.username=user;
    this.user.password=password;
    
    this.heroService.getUserByName(this.user)
      .then(useri => 
        {
          this.user.rights=useri.rights;
          // this.user.username = user;
          this.user.remember = this.remember;
          if(this.remember){

          }else{
            this.user.password='';
          }
          
          let body = JSON.stringify(this.user);
          localStorage.setItem('rapper_token', body);
          console.log('login');
          console.log(this.user);
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