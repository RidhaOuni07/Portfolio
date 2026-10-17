import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { IconComponent, IconName } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

/** Opening screen: identity, one-line pitch, calls to action and headline stats. */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private readonly portfolio = inject(PortfolioService);

  protected readonly person = this.portfolio.person;
  protected readonly initials = computed(() => {
    const name = this.person()?.name ?? '';
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  });

  protected iconFor(icon: string): IconName {
    const known: IconName[] = ['github', 'linkedin', 'coursera', 'mail'];
    return known.includes(icon as IconName) ? (icon as IconName) : 'external';
  }
}
