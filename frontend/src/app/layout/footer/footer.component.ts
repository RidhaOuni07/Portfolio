import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { IconComponent, IconName } from '../../shared/icon.component';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  styles: `
    .footer {
      border-top: 1px solid var(--border);
      padding-block: 2rem;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .footer__inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .footer__socials {
      display: flex;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .footer__socials a {
      display: grid;
      place-items: center;
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 999px;
      border: 1px solid var(--border);
      color: var(--text);
    }

    .footer__socials a:hover {
      background: var(--surface-strong);
    }

    .footer__note {
      margin: 0;
    }
  `,
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <p class="footer__note">
          © {{ year }} {{ person()?.name ?? 'Ridha Ouni' }} · Built with Angular.
        </p>

        <ul class="footer__socials">
          @for (social of person()?.socials ?? []; track social.url) {
            <li>
              <a [href]="social.url" target="_blank" rel="noopener noreferrer">
                <app-icon [name]="iconFor(social.icon)" [label]="social.label" />
              </a>
            </li>
          }
        </ul>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
  protected readonly person = inject(PortfolioService).person;

  protected iconFor(icon: string): IconName {
    const known: IconName[] = ['github', 'linkedin', 'coursera', 'mail'];
    return known.includes(icon as IconName) ? (icon as IconName) : 'external';
  }
}
