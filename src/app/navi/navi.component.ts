import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NaviDrawer } from '../shared/services/navi.drawer.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  @Output() switchSite = new EventEmitter<string>();

  private subpage = 'webdesign';

  constructor(private drawer: NaviDrawer) { }

  ngOnInit() {
    this.drawer.draw();
    // this.switchSite.emit(this.subpage); throws error
  }

  private goto(subpage: string): void {
    this.subpage = subpage;
    this.switchSite.emit(subpage);
  }
}
