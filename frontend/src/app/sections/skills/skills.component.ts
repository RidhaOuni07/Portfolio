import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { IconComponent, IconName } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

/** Skill groups rendered as one card per domain. */
@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  protected readonly skillGroups = inject(PortfolioService).skillGroups;

  protected iconFor(icon: string): IconName {
    const known: IconName[] = ['code', 'chart', 'brain', 'server', 'cloud'];
    return known.includes(icon as IconName) ? (icon as IconName) : 'sparkle';
  }
}
