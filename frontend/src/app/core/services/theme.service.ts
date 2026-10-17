import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio.theme';

/** Persists the visitor's colour-scheme choice and reflects it on the <html> element. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<Theme>(this.initialTheme());

  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      this.document.documentElement.setAttribute('data-theme', theme);
      try {
        this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage can be unavailable (private mode); the theme still applies for this visit.
      }
    });
  }

  toggle(): void {
    this.currentTheme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private initialTheme(): Theme {
    const view = this.document.defaultView;
    try {
      const stored = view?.localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch {
      // Ignore and fall back to the OS preference.
    }
    if (typeof view?.matchMedia !== 'function') {
      return 'dark';
    }
    return view.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
