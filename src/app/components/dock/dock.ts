import { Component, ElementRef, inject, viewChildren } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import gsap from 'gsap';
import { WindowService } from '../../core/services/window.service';

import { LucideBriefcase, LucideFileText, LucideFolderGit2, LucideMail } from '@lucide/angular';
import { WindowId } from '../../core/models/window-model';
import { PORTFOLIO_WINDOW_LIST } from '../../core/data/portfolio-windows.data';

@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [TranslatePipe, LucideFileText, LucideFolderGit2, LucideMail, LucideBriefcase],
  templateUrl: './dock.html',
})
export class DockComponent {
  readonly windowService = inject(WindowService);

  readonly itemElements = viewChildren<ElementRef<HTMLElement>>('dockItem');

  readonly dockItems = PORTFOLIO_WINDOW_LIST.flatMap((window) =>
    window.dock
      ? [{ id: window.id, titleKey: window.titleKey, icon: window.dock.icon }]
      : [],
  );

  // para escalar
  private readonly baseWidth = 48;
  private readonly maxWidth = 72;
  private readonly baseScale = 1.0;
  private readonly maxScale = 1.5;
  private readonly effectRadius = 150;


  // al pasar el ratón
  onMouseMove(event: MouseEvent) {
    const mouseX = event.clientX;
    
    this.itemElements().forEach((itemRef) => {
      const el = itemRef.nativeElement;
      const button = el.querySelector('button');
      if (!button) return;

      const rect = el.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);

      if (distance < this.effectRadius) {
        const factor = Math.cos((distance / this.effectRadius) * (Math.PI / 2));
        const easedFactor = Math.pow(factor, 1.6);

        const targetWidth = this.baseWidth + (this.maxWidth - this.baseWidth) * easedFactor;
        const targetScale = this.baseScale + (this.maxScale - this.baseScale) * easedFactor;
        const translateY = -(targetScale - 1) * 20;

        gsap.to(el, {
          width: targetWidth,
          duration: 0.12,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        gsap.to(button, {
          scale: targetScale,
          y: translateY,
          duration: 0.12,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.to(el, {
          width: this.baseWidth,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  }

  onMouseLeave() {
    this.itemElements().forEach((itemRef) => {
      const el = itemRef.nativeElement;
      const button = el.querySelector('button');

      gsap.to(el, {
        width: this.baseWidth,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      if (button) {
        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  }

  handleClick(id: WindowId, itemWrapper: HTMLElement) {
    const button = itemWrapper.querySelector('button');
    const isCurrentlyOpen = this.windowService.windows()[id].isOpen;

    if (!isCurrentlyOpen && button) {
      gsap.timeline()
        .to(button, { y: -26, duration: 0.16, ease: 'power2.out' })
        .to(button, { y: 0, duration: 0.38, ease: 'bounce.out' });
    }

    if (isCurrentlyOpen) {
      this.windowService.bringToFront(id);
    } else {
      this.windowService.openWindow(id);
    }
  }
}
