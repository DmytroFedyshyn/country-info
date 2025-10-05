import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryService, Holiday, CountryBorder } from '../../services/country.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

const YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {
  code = signal<string>('');
  countryName = signal<string>('');
  currentYear = signal<number>(new Date().getFullYear());
  holidays = signal<Holiday[]>([]);
  neighbors = signal<CountryBorder[]>([]);
  loading = signal<boolean>(true);
  years = YEARS;

  private sub?: Subscription;

    private route = inject(ActivatedRoute);
    private api = inject(CountryService);
    private location = inject(Location);
    private router = inject(Router);

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((p) => {
      const c = p.get('code');
      this.code.set(c ?? '');
      this.fetch();
    });
  }

  fetch(): void {
      this.loading.set(true);
      this.api.getPublicHolidays(this.currentYear(), this.code()).subscribe({
        next: (list) => { this.holidays.set(list); this.loading.set(false); },
        error: () => this.loading.set(false),
      });

      this.api.getCountryInfo(this.code()).subscribe({
        next: (info) => {
          this.countryName.set(info?.commonName || this.code());
          this.neighbors.set(info?.borders ?? []);
        },
        error: () => {
          this.countryName.set(this.code());
          this.neighbors.set([]);
        },
      });
    }

    goBack(): void { this.location.back(); }
    goHome(): void { this.router.navigate(['/']); }

  pickYear(y: number): void {
    this.currentYear.set(y);
    this.fetch();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  title = computed(() =>
    `${this.countryName() || this.code()} — public holidays ${this.currentYear()}`
  );
}