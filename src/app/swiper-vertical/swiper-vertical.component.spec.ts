import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperVerticalComponent } from './swiper-vertical.component';

describe('SwiperVerticalComponent', () => {
  let component: SwiperVerticalComponent;
  let fixture: ComponentFixture<SwiperVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiperVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
