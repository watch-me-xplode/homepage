import { Component } from '@angular/core';

import { FontDrawer } from "./shared/services/font.drawer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private fontDrawer: FontDrawer) {
    fontDrawer.draw();
    setInterval(() => fontDrawer.switchSocketContainer(), 5000);
  }

}
