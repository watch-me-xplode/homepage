import { Component, OnInit } from '@angular/core';

import { FontDrawer } from './shared/services/font.drawer.service';

import { SiteSocketContainer } from './shared/models/site-socket.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fontDrawer: FontDrawer) { }

  ngOnInit(): void {
    // this.fontDrawer.draw();
    // setTimeout(() => this.fontDrawer.switchSocketContainer(), 5000);
  }

  private updateCanvas(site: SiteSocketContainer): void {
    this.fontDrawer.draw(site);
  }

}
