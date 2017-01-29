import { Component,OnInit } from '@angular/core';
import { LANGUAGETYPE } from './mock-data';
import { APPPAGE } from './page-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  page=APPPAGE.find(page=>page.id == 1);
  selectedLanguage:any=0;
  languages=LANGUAGETYPE;
  title = 'Walk In Center';

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
    location.reload();
  }
  
}
