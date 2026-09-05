import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="h-full w-full font-mono text-[13px] leading-relaxed text-slate-300 cursor-text selection:bg-blue-500/30">
      <div class="max-w-2xl">
        <p class="mb-4 text-slate-100">Hola, soy Lidia del Moral de la Torre.</p>
        
        <p class="mb-4">
          {{ 'ABOUT.TEXT' | translate }}
        </p>
        
        <p class="mb-4">
        
        </p>
        
        <p class="mb-4">
        
        </p>
        
        <div class="flex items-center mt-2">
          <span class="text-slate-500">~</span>
          <span class="w-2 h-4 bg-slate-400 ml-2 animate-pulse"></span>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}