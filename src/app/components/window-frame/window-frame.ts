import { Component, computed, inject, input } from '@angular/core';
import { CdkDrag, CdkDragEnd, CdkDragHandle } from '@angular/cdk/drag-drop';
import { WindowService } from '../../core/services/window.service';
import { WindowId } from '../../core/models/window-model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-window-frame',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, TranslatePipe],
  template: `
    <div
      cdkDrag
      cdkDragBoundary=".desktop-canvas"
      [cdkDragFreeDragPosition]="windowData().position"
      (cdkDragEnded)="savePosition($event)"
      (mousedown)="bringToFront()"
      [style.zIndex]="windowData().zIndex"
      [style.width.px]="windowData().size.width"
      [style.height.px]="windowData().size.height"
      class="absolute flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/85 backdrop-blur-xl text-slate-100 transition-shadow duration-200"
    >
      <!-- Barra superior de la ventana -->
      <div
        cdkDragHandle
        class="h-9 bg-slate-800/70 border-b border-white/10 flex items-center justify-between px-3 select-none cursor-move"
      >
        <div class="flex items-center gap-2 group">
          <button
            type="button"
            (click)="close()"
            class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Cerrar ventana"
          >
            <svg class="w-2 h-2 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          <button
            type="button"
            class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Minimizar ventana"
          >
            <svg class="w-2 h-2 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
            </svg>
          </button>
          <button
            type="button"
            class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Maximizar ventana"
          >
            <svg class="w-2 h-2 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
          </button>
        </div>

        <span class="text-xs font-medium text-slate-300 tracking-wide truncate">
          {{ titleKey() | translate }}
        </span>

        <div class="w-12"></div>
      </div>

      <!-- Contenido de la ventana -->
      <div class="flex-1 overflow-auto p-4 text-sm relative">
        <ng-content></ng-content>
      </div>

      <!-- Handle de redimensionado (esquina inferior derecha) -->
      <div 
        class="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-50 flex items-end justify-end p-1"
        (mousedown)="startResize($event)"
      >
        <!-- Simbolito sutil de drag -->
        <svg class="w-3 h-3 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15l-6 6" />
          <path d="M21 8l-13 13" />
        </svg>
      </div>
    </div>
  `
})
export class WindowFrameComponent {
  private windowService = inject(WindowService);

  readonly windowId = input.required<WindowId>();
  readonly titleKey = input.required<string>();

  readonly windowData = computed(() => this.windowService.windows()[this.windowId()]);

  bringToFront() {
    this.windowService.bringToFront(this.windowId());
  }

  close() {
    this.windowService.closeWindow(this.windowId());
  }

  savePosition(event: CdkDragEnd) {
    const { x, y } = event.source.getFreeDragPosition();
    this.windowService.updateWindowPosition(this.windowId(), x, y);
  }

  startResize(event: MouseEvent) {
    // Evita que el click se propague y active el cdkDrag u otros eventos
    event.preventDefault();
    event.stopPropagation();

    // posiciones y tamaños originales
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = this.windowData().size.width;
    const startHeight = this.windowData().size.height;

    // al mover el ratón
    const onMouseMove = (e: MouseEvent) => {
      // Calculamos el nuevo tamaño aplicando límites mínimos (ej. 300x200)
      const newWidth = Math.max(300, startWidth + (e.clientX - startX));
      const newHeight = Math.max(200, startHeight + (e.clientY - startY));
      
      this.windowService.updateWindowSize(this.windowId(), newWidth, newHeight);
    };

    // Función que se ejecuta al soltar el clic
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
