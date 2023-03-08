import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getWeather();
  }

  getWeather()
  {
    this.http.get<WeatherForecast[]>(this.baseUrl + 'api/WeatherForecast/GetWeatherForecast', 
    {
      headers: { 'Cache-Control' : 'public, max-age=31536000' }
    }).subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
