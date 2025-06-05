import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarsWeatherService {
  private readonly API_URL = 'https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map(data => {
        const solKeys = data.sol_keys || [];
        return solKeys.map((sol: string) => ({
          sol,
          ...data[sol]
        }));
      })
    );
  }
}