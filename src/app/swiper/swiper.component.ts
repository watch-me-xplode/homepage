import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {

  private indexCounter = 0;
  private counterStarted = false;
  private readonly slideCount = 7;
  private readonly visibleSlides = 3;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.counterStarted = true;
      setInterval(() => {
        this.indexCounter++;
        this.indexCounter = this.indexCounter % this.slideCount;
      }, 7000);
    }, 500);
  }

  private isSlideVisible(index: number): boolean {
    let indexPosition = index - this.indexCounter;
    if (indexPosition < 0) {
      indexPosition += this.slideCount;
    }
    return indexPosition < this.visibleSlides;
  }

}
