import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SiteSocketContainer } from '../shared/models/site-socket.model';
import { Point } from '../shared/models/point.model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  @Output() updateCanvas = new EventEmitter<SiteSocketContainer>();

  constructor() { }

  ngOnInit() {
      const text: string[] = [`Über mich:`];
      text.push('Neben der Entwicklung von Webseiten spiele ich hobbymäßig Fußball beim SV Essenbach. Fußball spielen macht mir sehr ' +
        'viel Spaß und ist auch eine hervorragende Abwechslung zur alltäglichen Schreibtischarbeit. Ich bin auch sehr oft mit dem ' +
        'Fahrrad unterwegs oder gehe zusätzlich zum Sport im Verein mit Freunden auf den Sportplatz.');
      text.push('Ich schaue sehr gerne Filme und Serien und bin großer Fan des Marvel Cinematic Universe und von "A Song of Ice and ' +
        'Fire" (Bücher und Serie).' +
        'Fahrrad unterwegs oder gehe zusätzlich zum Sport im Verein mit Freunden auf den Sportplatz.');
      const siteSocket = new SiteSocketContainer(text);
      siteSocket.setPosition([new Point(0, 0), new Point(0, 200)], [500, 500]);
      this.updateCanvas.emit(siteSocket);
  }

}
