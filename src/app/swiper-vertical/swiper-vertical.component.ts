import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-swiper-vertical',
  templateUrl: './swiper-vertical.component.html',
  styleUrls: ['./swiper-vertical.component.scss']
})
export class SwiperVerticalComponent implements OnInit {

  private indexCounter = 0;
  private counterStarted = false;
  private readonly slideCount = 22;
  private readonly visibleSlides = 7;

  constructor() { }

  ngOnInit() {
    // set swiper height after all necessary elements are added to the DOM
    //this.resizeSwiperHeight();
    setTimeout(() => {
      this.counterStarted = true;
      setInterval(() => {
        this.indexCounter++;
        this.indexCounter = this.indexCounter % this.slideCount;
      }, 2000);
    }, 500);
  }

  /**
   * swiper height is rendered to match the current display width settings
   */
  private resizeSwiperHeight() {
    const slides: any = document.getElementsByClassName('swiper-vertical-slide');
    const slideWraper = document.getElementById('swiper-vertical-slide-wrapper');
    if (slides.length > 0) {
      const slidewidth = slides[0].clientWidth;
      const slideHeight = slidewidth / 1200 * 190;
      slideWraper.setAttribute('height', slideHeight + 'px');
      slideWraper.style.height = slideHeight + 'px';
      for (let i = 0; i < slides.length; i++) {
        slides[i].setAttribute('height', slideHeight + 'px');
        slides[i].style.height = slideHeight + 'px';
      }
    }
  }

  private isSlideVisible(index: number): boolean {
    let indexPosition = index - this.indexCounter;
    if (indexPosition < 0) {
      indexPosition += this.slideCount;
    }
    return indexPosition < this.visibleSlides;
  }
}
