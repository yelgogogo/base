import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeroService } from './hero.service';
import { SIGNUPPAGE } from './page-signup';
import { User } from './hero';
// import { contentHeaders } from '../common/headers';

@Component({
  selector: 'my-signup',
  templateUrl: 'signup.component.html',
  styleUrls: [ 'signup.component.css' ]
})
export class SignupComponent implements OnInit{
  page=SIGNUPPAGE.find(page=>page.id == 1);
  user:User;

  constructor(public router: Router, public http: Http, private heroService: HeroService) {
  }


  ngOnInit(): void {
    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=SIGNUPPAGE.find(page=>page.id == languageid);
    }
    this.user= new User();
  }

  signup(event: any, user:string, password:string,email:string) {
    event.preventDefault();
    
    this.user.name=user;
    this.user.password=password;
    this.user.email=email;
    
    this.heroService.postUser(this.user)
      .then(useri => 
        {
          this.user = useri;
          console.log(useri);
          // let name=this.user.name;
          // let email=this.user.email;
          // let body = JSON.stringify({name,email });
          // localStorage.setItem('rapper_token', body);
          this.router.navigate(['login']);
        });
  }

  login(event: any) {
    event.preventDefault();
    this.router.navigate(['login']);
  }
}