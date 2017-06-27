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
import { BackgroundImageComponent } from './background-image/background-image.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { SwiperComponent } from './swiper/swiper.component';
import { SwiperVerticalComponent } from './swiper-vertical/swiper-vertical.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    WebdesignComponent,
    BusinessComponent,
    BackgroundImageComponent,
    HomeComponent,
    AboutMeComponent,
    ImpressumComponent,
    SwiperComponent,
    SwiperVerticalComponent
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
