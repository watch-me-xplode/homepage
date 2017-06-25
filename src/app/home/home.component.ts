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
      text.push('Mein Name ist Nikolai Wohlgemuth und ich studiere Informatik in Landshut. In meinen Semesterferien arbeite ich seit August 2016 als Software Entwickler in München.');
      text.push('Meine Freizeit verbringe ich sehr sportlich oder mit dem Erstellen von Webseiten.');
      const siteSocket = new SiteSocketContainer(text);
      siteSocket.setPosition([new Point(1200, 0), new Point(0, 200), new Point(0, 400)], [500, 500, 500]);
      this.updateCanvas.emit(siteSocket);
  }

}
