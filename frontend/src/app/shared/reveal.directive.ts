import { Directive, ElementRef, OnDestroy, effect, inject, input, signal } from '@angular/core';

/**
 * Fades an element in the first time it scrolls into view.
 *
 * Purely decorative: the element is visible immediately when IntersectionObserver is
 * unavailable, and the `prefers-reduced-motion` rules in styles.scss neutralise the
 * transition for visitors who ask for less movement.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal]': 'true',
    '[class.reveal--visible]': 'visible()',
    '[style.transition-delay.ms]': 'revealDelay()',
  },
})
export class RevealDirective implements OnDestroy {
  /** Stagger, in milliseconds, applied to the fade-in. */
  readonly revealDelay = input(0, { alias: 'appReveal', transform: toDelay });

  protected readonly visible = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    effect((onCleanup) => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.visible.set(true);
              this.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      this.observer.observe(this.host.nativeElement);
      onCleanup(() => this.disconnect());
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private disconnect(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }
}

function toDelay(value: number | string | undefined): number {
  const parsed = typeof value === 'string' ? Number.parseInt(value, 10) : value;
  return Number.isFinite(parsed) && parsed !== undefined ? Math.max(0, parsed as number) : 0;
}
