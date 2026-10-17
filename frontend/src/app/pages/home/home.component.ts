import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { AboutComponent } from '../../sections/about/about.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { CredentialsComponent } from '../../sections/credentials/credentials.component';
import { EducationComponent } from '../../sections/education/education.component';
import { ExperienceComponent } from '../../sections/experience/experience.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { SkillsComponent } from '../../sections/skills/skills.component';

/** Single-page layout: every section reads from the shared portfolio snapshot. */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    CredentialsComponent,
    ContactComponent,
  ],
  styles: `
    .state {
      display: grid;
      place-items: center;
      gap: 1rem;
      min-height: 60vh;
      text-align: center;
      padding-inline: 1rem;
    }

    .state__spinner {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 3px solid var(--border);
      border-top-color: var(--accent);
      animation: spin 0.9s linear infinite;
    }

    .state__error {
      max-width: 46ch;
      color: var(--text-muted);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
  template: `
    @if (loading() && !portfolio()) {
      <div class="state" role="status" aria-live="polite">
        <div class="state__spinner" aria-hidden="true"></div>
        <p>Loading portfolio…</p>
      </div>
    } @else if (error() && !portfolio()) {
      <div class="state" role="alert">
        <h1>Content unavailable</h1>
        <p class="state__error">{{ error() }}</p>
        <button type="button" class="btn btn--primary" (click)="retry()">Try again</button>
      </div>
    } @else {
      <app-hero />
      <app-about />
      <app-experience />
      <app-skills />
      <app-projects />
      <app-education />
      <app-credentials />
      <app-contact />
    }
  `,
})
export class HomeComponent {
  private readonly service = inject(PortfolioService);

  protected readonly portfolio = this.service.portfolio;
  protected readonly loading = this.service.loading;
  protected readonly error = this.service.error;

  constructor() {
    this.service.load();
  }

  protected retry(): void {
    this.service.load(true);
  }
}
