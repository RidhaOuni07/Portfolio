import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading.component';

const ALL = 'All';

/** Project gallery with client-side filtering by technology tag. */
@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, RevealDirective, IconComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly portfolio = inject(PortfolioService);

  protected readonly activeFilter = signal(ALL);
  protected readonly allLabel = ALL;

  /** Tags that appear on more than one project, so the filter stays useful. */
  protected readonly filters = computed(() => {
    const counts = new Map<string, number>();
    for (const project of this.portfolio.projects()) {
      for (const tag of project.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    const shared = [...counts.entries()]
      .filter(([, count]) => count > 1)
      .map(([tag]) => tag)
      .sort((a, b) => a.localeCompare(b));
    return [ALL, ...shared];
  });

  protected readonly visibleProjects = computed(() => {
    const filter = this.activeFilter();
    const projects = this.portfolio.projects();
    return filter === ALL ? projects : projects.filter((project) => project.tags.includes(filter));
  });

  protected select(filter: string): void {
    this.activeFilter.set(filter);
  }
}
