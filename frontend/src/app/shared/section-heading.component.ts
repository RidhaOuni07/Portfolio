import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RevealDirective } from './reveal.directive';

/** Consistent eyebrow / title / lead block used at the top of every section. */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  host: { class: 'section-heading' },
  styles: `
    .section-heading {
      display: block;
      margin-bottom: 2.25rem;
    }
  `,
  template: `
    <div appReveal>
      <p class="section__eyebrow">{{ eyebrow() }}</p>
      <h2 class="section__title" [id]="titleId()">{{ title() }}</h2>
      @if (lead()) {
        <p class="section__lead">{{ lead() }}</p>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input('');
  /** DOM id given to the heading so the parent <section> can reference it. */
  readonly titleId = input('');
}
