import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService, Country } from '../../services/country.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RandomCountriesComponent } from '../../widgets/random-countries/random-countries.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatListModule,
    MatProgressSpinnerModule,
    RandomCountriesComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    ScrollingModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  loading = signal(true);
  countries: Country[] = [];
  filtered: Country[] = [];
  search = new FormControl('', { nonNullable: true });
  sub?: Subscription;
  trackByCode = (_: number, c: Country) => c.countryCode;

  constructor(private api: CountryService) {}

  ngOnInit(): void {
    this.api.getAvailableCountries().subscribe({
      next: (list) => {
        this.countries = list;
        this.filtered = list;
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    this.sub = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map((q) => (q ?? '').toLowerCase()),
      map((q) => this.countries.filter((c) => c.name.toLowerCase().includes(q)))
    ).subscribe((v) => (this.filtered = v));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}