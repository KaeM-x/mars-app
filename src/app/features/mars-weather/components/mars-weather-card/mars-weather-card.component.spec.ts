import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarsWeatherCardComponent } from './mars-weather-card.component';

describe('MarsWeatherCardComponent', () => {
  let component: MarsWeatherCardComponent;
  let fixture: ComponentFixture<MarsWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarsWeatherCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarsWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
