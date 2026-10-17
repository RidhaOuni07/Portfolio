import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

/** Certificates, awards and community involvement grouped in one section. */
@Component({
  selector: 'app-credentials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.scss',
})
export class CredentialsComponent {
  private readonly portfolio = inject(PortfolioService);

  protected readonly certificates = this.portfolio.certificates;
  protected readonly awards = this.portfolio.awards;
  protected readonly volunteering = this.portfolio.volunteering;
}
