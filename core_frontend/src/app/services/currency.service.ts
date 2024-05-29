import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quotes } from '../interfaces/quotes';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
key = '52516|gNYRHbDHU2PX63XwMpNO';
  constructor(private http: HttpClient) { }

  getCurrency(): Observable<any>{
    return this.http.get<Quotes[]>(
      //cambio today
      //`https://api.cambio.today/v1/full/EUR/json?key=${this.key}`
      `https://v6.exchangerate-api.com/v6/e0ecd6962e993801550da7ef/latest/USD`
    );
  }
}
