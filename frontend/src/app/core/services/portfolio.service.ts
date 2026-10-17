import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Portfolio } from '../models/portfolio.model';

/**
 * Single source of truth for CV content.
 *
 * Loads portfolio data from a static JSON asset — no backend required.
 * The whole portfolio is cached in a signal so every section renders from
 * the same snapshot without refetching.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  private readonly data = signal<Portfolio | null>(null);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly portfolio = this.data.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  readonly person = computed(() => this.data()?.person ?? null);
  readonly experiences = computed(() => this.data()?.experiences ?? []);
  readonly education = computed(() => this.data()?.education ?? []);
  readonly skillGroups = computed(() => this.data()?.skillGroups ?? []);
  readonly projects = computed(() => this.data()?.projects ?? []);
  readonly certificates = computed(() => this.data()?.certificates ?? []);
  readonly awards = computed(() => this.data()?.awards ?? []);
  readonly volunteering = computed(() => this.data()?.volunteering ?? []);
  readonly languages = computed(() => this.data()?.languages ?? []);
  readonly interests = computed(() => this.data()?.interests ?? []);

  /** Fetches the portfolio from the static JSON asset unless already cached. */
  load(force = false): void {
    if (this.loadingState() || (this.data() !== null && !force)) {
      return;
    }
    this.loadingState.set(true);
    this.errorState.set(null);

    this.http.get<Portfolio>('data/portfolio.json').subscribe({
      next: (portfolio) => {
        this.data.set(portfolio);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set('Unable to load portfolio data.');
        this.loadingState.set(false);
      },
    });
  }
}
