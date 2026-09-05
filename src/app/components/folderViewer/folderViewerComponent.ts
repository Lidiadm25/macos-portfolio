import { Component, input, output } from '@angular/core';
import { 
  LucideFolder, 
  LucideFileText, 
  LucideImage, 
  LucideExternalLink,
} from '@lucide/angular';
import { FolderItem } from '../../core/models/folder-item.model';

@Component({
  selector: 'app-folder-viewer',
  standalone: true,
  imports: [
    LucideFolder, 
    LucideFileText, 
    LucideImage, 
    LucideExternalLink,
  ],
  templateUrl: './folderViewer.html',
})
export class FolderViewerComponent {
  readonly currentFolderName = input.required<string>();
  readonly items = input.required<readonly FolderItem[]>();
  readonly itemActivated = output<FolderItem>();

  handleItemClick(item: FolderItem) {
    if (item.url) { // Si el item tiene una URL, abrirla en una nueva pestaña
      window.open(item.url, '_blank');
    } else if (item.action) { // Si el item tiene una acción definida, ejecutarla, por ejemplo un alert, abrir otra ventana, etc.
      item.action();
    }
    else {
      this.itemActivated.emit(item);
    }
  }
}
