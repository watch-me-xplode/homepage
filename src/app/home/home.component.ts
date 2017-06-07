import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SiteSocketContainer } from '../shared/models/site-socket.model';
import { Point } from '../shared/models/point.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() updateCanvas = new EventEmitter<SiteSocketContainer>();

  constructor() { }

  ngOnInit() {
      const text: string[] = [];
      text.push('Hallo und Willkommen auf meiner Webseite!');
      text.push('Mein Name ist Nikolai Wohlgemuth, ich bin Student und Software Entwickler und verbringe meine Freizeit, unter anderem, gerne mit dem Erstellen von Webseiten.');
      const siteSocket = new SiteSocketContainer(text);
      siteSocket.setPosition([new Point(0, 0), new Point(0, 200)], [500, 500]);
      this.updateCanvas.emit(siteSocket);
  }

}
