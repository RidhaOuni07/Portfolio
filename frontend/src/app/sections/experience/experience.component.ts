import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

/** Chronological timeline of professional roles. */
@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  protected readonly experiences = inject(PortfolioService).experiences;
}
