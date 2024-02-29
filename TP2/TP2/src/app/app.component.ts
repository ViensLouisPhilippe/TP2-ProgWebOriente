import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP2';
  language : string = "fr-ca";


  constructor(public http : HttpClient, public translator : TranslateService) {
    this.translator.setDefaultLang(this.language);
   }

  changeLanguage(){
    this.translator.use(this.language);
  }
  
}
