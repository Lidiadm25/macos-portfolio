import type { WindowId } from '../data/portfolio-windows.data';

export type { WindowId } from '../data/portfolio-windows.data';

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
