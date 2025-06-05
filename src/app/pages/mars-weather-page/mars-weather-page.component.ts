import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarsWeatherService } from '../../features/mars-weather/services/mars-weather.service';
import { MarsWeatherCardComponent } from '../../features/mars-weather/components/mars-weather-card/mars-weather-card.component';

@Component({
  selector: 'app-mars-weather-page',
  standalone: true,
  imports: [CommonModule, MarsWeatherCardComponent],
  templateUrl: './mars-weather-page.component.html',
  styleUrls: ['./mars-weather-page.component.scss'] // ← poprawiona literówka
})
export class MarsWeatherPageComponent implements OnInit {
  weatherData: any[] = [];
  loading = true;
  error = '';

  constructor(private weatherService: MarsWeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Błąd ładowania danych.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
