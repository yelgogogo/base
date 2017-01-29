import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeroService } from './hero.service';
import { LOGINPAGE } from './page-login';
import { User } from './hero';
// import { contentHeaders } from '../common/headers';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: [ 'login.css' ]
})
export class Login implements OnInit{
  page=LOGINPAGE.find(page=>page.id == 1);
  user:User;

  constructor(public router: Router, public http: Http, private heroService: HeroService) {
  }


  ngOnInit(): void {
    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=LOGINPAGE.find(page=>page.id == languageid);
    }
  }

  login(event: any, user:string) {
    event.preventDefault();
    this.heroService.getUserByName(user)
      .then(user => 
        {
          this.user = user;
          let name=user.name;
          let email=user.email;
          let body = JSON.stringify({name,email });
          localStorage.setItem('id_token', body);
          this.router.navigate(['workarea']);
        });
  }

  signup(event: any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}