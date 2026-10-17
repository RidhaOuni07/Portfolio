import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'github'
  | 'linkedin'
  | 'coursera'
  | 'mail'
  | 'phone'
  | 'location'
  | 'sun'
  | 'moon'
  | 'external'
  | 'code'
  | 'chart'
  | 'brain'
  | 'server'
  | 'cloud'
  | 'sparkle'
  | 'check'
  | 'arrow-down'
  | 'download';

/**
 * Inline SVG icon set, so there is no icon-font dependency or extra network request.
 *
 * Glyph geometry follows the 24x24 stroke style of [Feather Icons](https://feathericons.com),
 * which is distributed under the MIT licence.
 *
 * Icons are decorative by default (aria-hidden). Pass `label` when an icon is the only
 * content of an interactive element so screen readers announce something meaningful.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-icon' },
  styles: `
    .app-icon {
      display: inline-flex;
      line-height: 0;
      flex: none;
    }

    svg {
      width: var(--icon-size, 1.15em);
      height: var(--icon-size, 1.15em);
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.role]="label() ? 'img' : 'presentation'"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.aria-label]="label() || null"
    >
      @switch (name()) {
        @case ('github') {
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          />
        }
        @case ('linkedin') {
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        }
        @case ('coursera') {
          <circle cx="12" cy="8" r="7" />
          <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
        }
        @case ('mail') {
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="m22 6-10 7L2 6" />
        }
        @case ('phone') {
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.36 1.87.7 2.75a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.88.34 1.81.57 2.75.7A2 2 0 0 1 22 16.92z"
          />
        }
        @case ('location') {
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        }
        @case ('sun') {
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        }
        @case ('moon') {
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        }
        @case ('external') {
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6M10 14 21 3" />
        }
        @case ('code') {
          <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
        }
        @case ('chart') {
          <path d="M18 20V10M12 20V4M6 20v-6" />
        }
        @case ('brain') {
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        }
        @case ('server') {
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <path d="M6 6h.01M6 18h.01" />
        }
        @case ('cloud') {
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        }
        @case ('sparkle') {
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        }
        @case ('check') {
          <path d="m20 6-11 11-5-5" />
        }
        @case ('arrow-down') {
          <path d="M12 5v14M19 12l-7 7-7-7" />
        }
        @case ('download') {
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10 5 5 5-5" />
          <path d="M12 15V3" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  /** Accessible name; omit for purely decorative icons. */
  readonly label = input('');
}
