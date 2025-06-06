import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarsWeatherPageComponent } from './mars-weather-page.component';

describe('MarsWeatherPageComponent', () => {
  let component: MarsWeatherPageComponent;
  let fixture: ComponentFixture<MarsWeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarsWeatherPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarsWeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
