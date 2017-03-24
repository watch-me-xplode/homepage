import { Component, OnInit } from '@angular/core';

import { FontDrawer } from "./shared/services/font.drawer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fontDrawer: FontDrawer) { }

  ngOnInit(): void {
    this.fontDrawer.draw();
    setTimeout(() => this.fontDrawer.switchSocketContainer(), 5000);
  }

}
