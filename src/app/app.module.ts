import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { D3Service } from 'd3-ng2-service';

import { NaviDrawer } from "./shared/services/navi.drawer.service";
import { FontDrawer } from "./shared/services/font.drawer.service";

import { AppComponent } from './app.component';
import { NaviComponent } from './navi/navi.component';
import { WebdesignComponent } from './webdesign/webdesign.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    WebdesignComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    D3Service,
    
    NaviDrawer,
    FontDrawer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
