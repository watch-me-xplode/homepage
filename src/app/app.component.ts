import { Component, OnInit } from '@angular/core';

import { FontDrawer } from './shared/services/font.drawer.service';

import { SiteSocketContainer } from './shared/models/site-socket.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private subpage;

  constructor(private fontDrawer: FontDrawer) { }

  ngOnInit(): void {
    console.log(window.innerWidth);
    console.log(window.outerWidth);
    console.log(window.innerHeight);
    console.log(window.outerHeight);
  }

  private updateCanvas(site: SiteSocketContainer): void {
    this.fontDrawer.draw(site);
  }

  private switchSite(site: string): void {
    this.subpage = site;
  }

}
