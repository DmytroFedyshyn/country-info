import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../config/api.config';
import { map, Observable } from 'rxjs';

export interface Country { countryCode: string; name: string; }
export interface CountryBorder {commonName: string; officialName: string; countryCode: string; region: string;
}
export interface Holiday {
  date: string; localName: string; name: string; countryCode: string;
  fixed: boolean; global: boolean; counties?: string[] | null; launchYear?: number | null;
  types: string[];
}
export interface CountryInfo {
  commonName: string; officialName: string; countryCode: string; region: string; borders: CountryBorder[];
}

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly base = inject(API_BASE_URL) + '/api/v3';
  constructor(private http: HttpClient) {}

  getAvailableCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.base}/AvailableCountries`)
      .pipe(map(xs => xs.sort((a,b)=>a.name.localeCompare(b.name))));
  }
  getPublicHolidays(year: number, code: string) {
    return this.http.get<Holiday[]>(`${this.base}/PublicHolidays/${year}/${code}`);
  }
  getNextPublicHolidays(code: string) {
    return this.http.get<Holiday[]>(`${this.base}/NextPublicHolidays/${code}`);
  }
  getCountryInfo(code: string) {
    return this.http.get<CountryInfo>(`${this.base}/CountryInfo/${code}`);
  }
}