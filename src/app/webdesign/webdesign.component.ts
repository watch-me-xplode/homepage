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
      //const text: string[] = [`A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.`];
      const text: string[] = [`good.`];
      text.push(text[0]);
      text.push(text[0]);
      const siteSocket = new SiteSocketContainer(text);
      siteSocket.setPosition([new Point(0, 0), new Point(0, 130), new Point(0, 260)], [500, 500, 500]);
      this.updateCanvas.emit(siteSocket);
  }
}
