import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarsWeatherService } from '../../features/mars-weather/services/mars-weather.service';
import { MarsWeatherCardComponent } from '../../features/mars-weather/components/mars-weather-card/mars-weather-card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mars-weather-page',
  standalone: true,
  imports: [CommonModule, MarsWeatherCardComponent, MarsWeatherCardComponent, MatSnackBarModule],
  templateUrl: './mars-weather-page.component.html',
  styleUrls: ['./mars-weather-page.component.scss']
})
export class MarsWeatherPageComponent implements OnInit {
  weatherData: any[] = [];
  loading = true;
  error = '';

  constructor(private weatherService: MarsWeatherService, private snackBar: MatSnackBar) {}

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

  handleNoteAdded(sol: string): void {
  this.snackBar.open(`Note added for Sol ${sol}`, 'OK', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });
}
}
