import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent implements OnInit, OnChanges {
  @Input() currentSite: string;

  private imageOneActive = true;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const site: SimpleChange = (<any>changes).currentSite.currentValue;
    this.currentSite = site.currentValue;
    this.imageOneActive = !this.imageOneActive;
  }

}
