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
      const text1: string[] = [`A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.`];
      text1.push(text1[0]);
      text1.push(text1[0]);
      const text2: string[] = [`Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.`];
      text2.push(text2[0]);
      const siteSocket1 = new SiteSocketContainer(text1);
      siteSocket1.setPosition([new Point(0, 0), new Point(0, 500), new Point(0, 1000)], [500, 500, 500]);
      const siteSocket2 = new SiteSocketContainer(text2);
      siteSocket2.setPosition([new Point(0, 0), new Point(0, 500)], [500, 500]);
      this.updateCanvas.emit(siteSocket1);
  }

}
