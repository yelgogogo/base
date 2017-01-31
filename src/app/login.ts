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
    // let regs = [
    //   {id:1,owner:'Michael',description:'aaa->ReplaceA',enable:true,regScope : 'atest.',regScopeAttr : 'g',regFind : 'aaa',regFindAttr : 'i',regReplace : 'ReplaceA'},
    //   {id:2,owner:'Michael',description:'bbb->ReplaceB',enable:true,regScope : 'btest..',regScopeAttr : 'g',regFind : 'bbb',regFindAttr : 'i',regReplace : 'ReplaceBB'},
    //   {id:3,owner:'Michael',description:'ccc->ReplaceC',enable:true,regScope : 'ctest...',regScopeAttr : 'g',regFind : 'ccc',regFindAttr : 'i',regReplace : 'ReplaceCCC'}
    // ];
    // let file = 
    //   {id: 1, enable:true, filename:'ASQERA1.rx', path:'uploads\\ASQERA1.rx', convFlag:true,convPath:'test\\ASQERA1.rx',createTime:'',updateTime:''};
    //     this.heroService.getConv(file,regs)
    //       .then(res => console.log(res));

    this.heroService.getUserByName(user)
      .then(user => 
        {
          this.user = user;
          let name=user.name;
          let email=user.email;
          let body = JSON.stringify({name,email });
          localStorage.setItem('rapper_token', body);
          this.router.navigate(['workarea']);
        });
  }

  signup(event: any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}