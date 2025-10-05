import { InjectionToken, isDevMode } from '@angular/core';

/** Base URL for Nager.Date API; can be overridden in main.ts providers */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => (isDevMode() ? 'https://date.nager.at' : 'https://date.nager.at'),
});