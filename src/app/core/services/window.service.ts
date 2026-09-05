import { Injectable, signal } from '@angular/core';
import { WindowId, WindowState } from '../models/window-model';
import { PORTFOLIO_WINDOW_LIST } from '../data/portfolio-windows.data';


@Injectable({
  providedIn: 'root',
})

export class WindowService {
  
  private baseZIndex = signal<number>(100);
  // instancia de signal que contiene el estado de todas las ventanas, con su posición, tamaño, zIndex y si está abierta o no
  readonly windows = signal<Record<WindowId, WindowState>>(
    Object.fromEntries(
      PORTFOLIO_WINDOW_LIST.map((window) => [
        window.id,
        {
          id: window.id,
          isOpen: false,
          zIndex: 100,
          position: { ...window.position },
          size: { ...window.size },
        },
      ]),
    ) as Record<WindowId, WindowState>,
  );

  // la constante para dar el efecto de superposición
  openWindow(id: WindowId) {
    const nextZ = this.baseZIndex() + 1;
    this.baseZIndex.set(nextZ);

    //update de la ventana con el id dado, estableciendo isOpen a true y zIndex al siguiente valor
    this.windows.update((state) => ({
      ...state,
      [id]: {
        ...state[id],
        isOpen: true,
        zIndex: nextZ,
      },
    }));
  }

  closeWindow(id: WindowId) {
    this.windows.update((state) => ({
      ...state,
      [id]: {
        ...state[id],
        isOpen: false,
      },
    }));
  }

  isOpen(id: WindowId) {
    return this.windows()[id].isOpen;
  }

  // función para traer la ventana al frente, actualizando su zIndex al siguiente valor
  bringToFront(id: WindowId) {
    const nextZ = this.baseZIndex() + 1;
    this.baseZIndex.set(nextZ);

    this.windows.update((state) => ({
      ...state,
      [id]: {
        ...state[id],
        zIndex: nextZ,
      },
    }));
  }

  updateWindowSize(id: WindowId, width: number, height: number) {
    this.windows.update((state) => ({
      ...state,
      [id]: {
        ...state[id],
        size: { width, height },
      },
    }));
  }

  updateWindowPosition(id: WindowId, x: number, y: number) {
    this.windows.update((state) => ({
      ...state,
      [id]: {
        ...state[id],
        position: { x, y },
      },
    }));
  }
}
