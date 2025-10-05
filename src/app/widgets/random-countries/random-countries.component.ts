import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService, Country } from '../../services/country.service';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Card {
  country: Country;
  holidayName?: string;
  holidayDate?: string;
}

@Component({
  selector: 'app-random-countries',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './random-countries.component.html',
  styleUrls: ['./random-countries.component.scss'],
})
export class RandomCountriesComponent implements OnInit {
  loading = true;
  cards: Card[] = [];

  private api = inject(CountryService);

  ngOnInit(): void {
    this.api.getAvailableCountries().subscribe({
      next: (list) => {
        const pick = [...list].sort(() => Math.random() - 0.5).slice(0, 3);
        forkJoin(pick.map((c) => this.api.getNextPublicHolidays(c.countryCode))).subscribe({
          next: (arr) => {
            this.cards = pick.map((c, i) => {
              const h = arr[i]?.[0];
              return {
                country: c,
                holidayName: h?.localName ?? h?.name,
                holidayDate: h?.date,
              };
            });
            this.loading = false;
          },
          error: () => (this.loading = false),
        });
      },
      error: () => (this.loading = false),
    });
  }
}
