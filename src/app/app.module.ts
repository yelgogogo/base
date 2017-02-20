import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { Login } from './login';
import { OrderList } from './orderlist';
import { HeroService } from './hero.service';
import { MaterialModule} from '@angular/material';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import 'hammerjs';
import {AreaPipe} from './area.pipe'
import {OrderByPipe} from './orderby';
// import { ChartsModule } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { BarChartDemoComponent } from './components/charts/bar-chart-demo';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService,{delay:600}),
    ChartsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FileSelectDirective,
    AreaPipe,OrderList,OrderByPipe,
    // BarChartDemoComponent,
    routedComponents
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
