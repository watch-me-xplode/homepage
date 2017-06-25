import { Component, OnInit } from '@angular/core';

import { FontDrawer } from './shared/services/font.drawer.service';

import { SiteSocketContainer } from './shared/models/site-socket.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private subpage = 'home';

  constructor(private fontDrawer: FontDrawer) { }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        location.reload();
      }, 300);
    });
  }

  private updateCanvas(site: SiteSocketContainer): void {
    this.fontDrawer.draw(site);
  }

  private switchSite(site: string): void {
    this.subpage = site;
  }

}
