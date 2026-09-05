import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe],
  host: {
    class: 'block h-full w-full min-w-0',
  },
  template: `
    <div class="h-full w-full min-w-0 font-mono text-[13px] leading-relaxed text-slate-300 cursor-text selection:bg-blue-500/30">
      <p class="mb-4 w-full break-words">
        {{ 'ABOUT.TEXT' | translate }}
      </p>

      <div class="mt-2 flex items-center">
        <span class="text-slate-500">~</span>
        <span class="ml-2 h-4 w-2 animate-pulse bg-slate-400"></span>
      </div>
    </div>
  `
})
export class AboutComponent {}
