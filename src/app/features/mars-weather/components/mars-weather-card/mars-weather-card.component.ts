import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-mars-weather-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './mars-weather-card.component.html',
  styleUrls: ['./mars-weather-card.component.scss']
})
export class MarsWeatherCardComponent {
  @Input() solData: any;
}