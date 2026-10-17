import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

import { ThemeService } from '../../core/services/theme.service';
import { IconComponent, IconName } from '../../shared/icon.component';

interface NavItem {
  readonly id: string;
  readonly label: string;
}

/** Sticky top navigation with scroll-spy highlighting and a theme toggle. */
@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
  protected readonly items: readonly NavItem[] = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly activeId = signal<string>('');
  protected readonly menuOpen = signal(false);

  private readonly theme = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private observer?: IntersectionObserver;

  protected readonly themeLabel = computed(() =>
    this.theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );
  protected readonly themeIcon = computed<IconName>(() => (this.theme.theme() === 'dark' ? 'sun' : 'moon'));

  constructor() {
    // Scroll-spy needs real layout, so wire it up after the first render.
    afterNextRender(() => this.observeSections());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  private observeSections(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          this.activeId.set(visible.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );

    for (const item of this.items) {
      const element = this.document.getElementById(item.id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }
}
