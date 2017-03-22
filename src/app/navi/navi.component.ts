import { Component, OnInit } from '@angular/core';

import { NaviDrawer } from "../shared/services/navi.drawer.service";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  constructor(private naviDrawer: NaviDrawer) { }

  ngOnInit() {
    this.naviDrawer.draw();
  }
}
