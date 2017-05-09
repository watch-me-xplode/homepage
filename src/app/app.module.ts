import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { D3Service } from 'd3-ng2-service';

import { FontDrawer } from './shared/services/font.drawer.service';
import { NaviDrawer } from './shared/services/navi.drawer.service';
import { NaviMenubuttonContentDrawer } from './shared/services/navi-menubutton-content.drawer.service';

import { AppComponent } from './app.component';
import { NaviComponent } from './navi/navi.component';
import { WebdesignComponent } from './webdesign/webdesign.component';
import { BusinessComponent } from './business/business.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    WebdesignComponent,
    BusinessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    D3Service,
    FontDrawer,
    NaviDrawer,
    NaviMenubuttonContentDrawer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
