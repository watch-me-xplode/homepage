import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SiteSocketContainer } from '../shared/models/site-socket.model';
import { Point } from '../shared/models/point.model';

@Component({
  selector: 'app-webdesign',
  templateUrl: './webdesign.component.html',
  styleUrls: ['./webdesign.component.scss']
})
export class WebdesignComponent implements OnInit {

  @Output() updateCanvas = new EventEmitter<SiteSocketContainer>();

  constructor() { }

  ngOnInit() {
      const text: string[] = ['Sie möchten Ihren aktuellen Internetauftritt verbessern oder eine gänzlich neue Webseite?'];
      text.push('Vorteile: kostengünstig, stilvoll, ansprechend');
      const siteSocket = new SiteSocketContainer(text);
      siteSocket.setPosition([new Point(0, 0), new Point(0, 130)], [500, 500]);
      this.updateCanvas.emit(siteSocket);
  }
}
