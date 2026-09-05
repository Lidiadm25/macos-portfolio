import { Component, inject, signal } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';
import { WindowFrameComponent } from './components/window-frame/window-frame';
import { DockComponent } from './components/dock/dock';
import { WindowService } from './core/services/window.service';
import { AboutComponent } from './components/about/about';
import { DesktopIconComponent } from './components/DesktopIconComponent/desktopIconComponent';
import { FolderViewerComponent } from './components/folderViewer/folderViewerComponent';
import { TranslatePipe } from '@ngx-translate/core';
import { PORTFOLIO_WINDOW_LIST } from './core/data/portfolio-windows.data';
import { WindowId } from './core/models/window-model';
import { FolderItem } from './core/models/folder-item.model';
import { TextViewer } from "./components/TextViewer/TextViewer";

@Component({
  selector: 'app-root',
  imports: [TopbarComponent, WindowFrameComponent, DockComponent, AboutComponent, DesktopIconComponent, FolderViewerComponent, TranslatePipe, TextViewer],
  templateUrl: './app.html',
  styleUrl: './app.css'

})
export class App {
  readonly windowService = inject(WindowService);
  // PORTFOLIO WINDOW LIST - Catálogo COMPLETO
  // desktopItems - Aquellas que pertenecen al DESKTOP

  readonly portfolioWindows = PORTFOLIO_WINDOW_LIST;
  readonly desktopItems = PORTFOLIO_WINDOW_LIST.filter((window) => window.desktop);

   protected readonly title = signal('macos-portfolio');

  handleOpen(id: WindowId) {
    this.windowService.openWindow(id);
  }

  handleFolderItemActivated(item: FolderItem) {
    console.log('Item activated:', item);
  if (item.id === 'innovasur-internship') {
    this.windowService.openWindow('innovasurDetail');
  } else if (item.id === 'esports-player') {
    this.windowService.openWindow('esports');
  } else if (item.id === 'esports-links') {
    this.windowService.openWindow('links');
  } else if (item.id === 'esports-bio') {
    this.windowService.openWindow('details');
  }

}
}
