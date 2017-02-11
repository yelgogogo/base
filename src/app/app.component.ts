import { Component,OnInit } from '@angular/core';
import { LANGUAGETYPE } from './mock-data';
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

  constructor(private missionService: MissionService) {
    // missionService.missionConfirmed$.subscribe(
    //   astronaut => {
    //     this.history.push(`${astronaut} confirmed the mission`);
      // });
  }

  ngOnInit(): void {
    if(localStorage.getItem('rapper_language') ){
      let languageid=localStorage.getItem('rapper_language');
      this.page=APPPAGE.find(page=>page.id == languageid);
    }
  }


  updateLanguage(selectedLanguage:any): void {
    console.log(selectedLanguage);

    localStorage.setItem('rapper_language', selectedLanguage.id);
    this.page=APPPAGE.find(page=>page.id == selectedLanguage.id);
    //location.reload();

    this.missionService.announceMission(selectedLanguage.id);
  }
  
}
