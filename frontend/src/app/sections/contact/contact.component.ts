import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PortfolioService } from '../../core/services/portfolio.service';
import { IconComponent, IconName } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Contact section with mailto-based form (no backend needed). */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SectionHeadingComponent, RevealDirective, IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly portfolio = inject(PortfolioService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly person = this.portfolio.person;
  protected readonly status = signal<Status>('idle');
  protected readonly feedback = signal('');

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    subject: ['', [Validators.maxLength(160)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
  });

  protected submit(): void {
    if (this.status() === 'sending') {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('error');
      this.feedback.set('Please fix the highlighted fields before sending.');
      return;
    }

    const { name, email, subject, message } = this.form.getRawValue();
    const recipientEmail = this.person()?.email ?? 'ridha.ouni.dev@gmail.com';
    const mailSubject = subject || `Portfolio message from ${name}`;
    const mailBody = `From: ${name} (${email})\n\n${message}`;

    const mailtoUrl =
      `mailto:${recipientEmail}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    window.open(mailtoUrl, '_blank');

    this.status.set('sent');
    this.feedback.set('Your email client should open with the message. Thank you!');
    this.form.reset();
  }

  /** True once a field is both invalid and has been interacted with. */
  protected showError(field: 'name' | 'email' | 'subject' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  protected errorFor(field: 'name' | 'email' | 'subject' | 'message'): string {
    const errors = this.form.controls[field].errors;
    if (!errors) {
      return '';
    }
    if (errors['required']) {
      return 'This field is required.';
    }
    if (errors['email']) {
      return 'Enter a valid email address.';
    }
    if (errors['minlength']) {
      return `Use at least ${errors['minlength'].requiredLength} characters.`;
    }
    if (errors['maxlength']) {
      return `Use at most ${errors['maxlength'].requiredLength} characters.`;
    }
    return 'This value is not valid.';
  }

  protected iconFor(icon: string): IconName {
    const known: IconName[] = ['github', 'linkedin', 'coursera', 'mail'];
    return known.includes(icon as IconName) ? (icon as IconName) : 'external';
  }
}
