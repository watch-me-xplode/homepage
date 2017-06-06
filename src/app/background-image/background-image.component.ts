import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent implements OnInit, OnChanges {
  @Input() currentSite: string;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const site: SimpleChange = (<any>changes).currentSite;
    this.currentSite = site.currentValue;
  }

}
