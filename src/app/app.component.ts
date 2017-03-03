import { Component,OnInit } from '@angular/core';
import { LANGUAGETYPE } from './mock-data';
import { Router } from '@angular/router';
import { APPPAGE } from './page-app';
import { MissionService }     from './mission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MissionService]
})
export class AppComponent implements OnInit{
  page=APPPAGE.find(page=>page.id == 1);
  selectedLanguage:any=0;
  languages=LANGUAGETYPE;
  title = 'Walk In Center';
  nightmode=false;
  login=false;

  constructor(public router: Router, private missionService: MissionService) {
    missionService.Login$.subscribe(
      l => {
        this.login=l;
      });
  }

  ngOnInit(): void {
    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=APPPAGE.find(page=>page.id == languageid);
    }
  }

  changeMode(select:boolean):void{
    if (select){
      this.nightmode=false;
    }else{
      this.nightmode=true;
    }
    this.missionService.changeMode(this.nightmode);
    
  }

  logOut(event: any) {
    event.preventDefault();
    this.router.navigate(['login']);
    this.missionService.Login(false);
  }

  updateLanguage(selectedLanguage:any): void {
    //console.log(selectedLanguage);

    localStorage.setItem('rapper_language', selectedLanguage.id);
    this.page=APPPAGE.find(page=>page.id == selectedLanguage.id);
    //location.reload();

    this.missionService.announceMission(selectedLanguage.id);
  }
  
}
