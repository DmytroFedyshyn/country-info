import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Country {
  name: string;
  countryCode: string;
}
export interface Holiday {
  date: string;
  localName?: string;
  name: string;
  types?: string[];
}
export interface CountryBorder {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}
export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryBorder[];
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly base = environment.apiBase;

  constructor(private http: HttpClient) {}

  getAvailableCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.base}/api/v3/AvailableCountries`);
  }

  getPublicHolidays(year: number, code: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.base}/api/v3/PublicHolidays/${year}/${code}`);
  }

  getNextPublicHolidays(code: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.base}/api/v3/NextPublicHolidays/${code}`);
  }

  getCountryInfo(code: string): Observable<CountryInfo> {
    return this.http.get<CountryInfo>(`${this.base}/api/v3/CountryInfo/${code}`);
  }
}
