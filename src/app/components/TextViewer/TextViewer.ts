import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-text-viewer',
  imports: [TranslatePipe],
  templateUrl: './TextViewer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TextViewer {
   readonly textKey = input.required<string>();
}
