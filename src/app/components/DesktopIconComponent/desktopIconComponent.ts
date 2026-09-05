import { Component, input, output } from '@angular/core';
import { LucideFolder, LucideFileText } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioWindow } from '../../core/data/portfolio-windows.data';
import { WindowId } from '../../core/models/window-model';

@Component({
  selector: 'app-desktop-icon',
  standalone: true,
  imports: [LucideFolder, LucideFileText, TranslatePipe],
  template: `
    <button
      type="button"
      (click)="openItem()"
      class="group flex flex-col items-center justify-center w-24 p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none select-none text-center cursor-pointer"
    >
      <div class="relative flex items-center justify-center w-12 h-12 mb-1 drop-shadow-md">
        @switch (item().desktop?.icon) {
          @case ('folder') {
            <svg lucideFolder class="w-10 h-10 text-sky-400 fill-sky-400/30 stroke-[1.5]"></svg>
          }
          @case ('file') {
            <svg lucideFileText class="w-10 h-10 text-slate-300 stroke-[1.5]"></svg>
          }
        }
      </div>

      <span class="text-[11px] font-medium leading-tight px-1.5 py-0.5 text-slate-100 rounded shadow-sm line-clamp-2 max-w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {{ item().titleKey | translate }}
      </span>
    </button>
  `
})
export class DesktopIconComponent {
  readonly item = input.required<PortfolioWindow>();
  readonly open = output<WindowId>();

  openItem() {
    this.open.emit(this.item().id);
  }
}
