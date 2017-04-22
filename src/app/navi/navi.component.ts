import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  @Output() switchSite = new EventEmitter<string>();

  private subpage = 'webdesign';

  constructor() { }

  ngOnInit() {
    this.switchSite.emit(this.subpage);
  }

  private goto(subpage: string): void {
    this.subpage = subpage;
    this.switchSite.emit(subpage);
  }
}
