import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LucideBattery, LucideWifi } from '@lucide/angular';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [DatePipe, TranslatePipe, LucideBattery, LucideWifi],
  templateUrl: './topbar.html',
})
export class TopbarComponent implements OnInit, OnDestroy {
  private translate = inject(TranslateService);

  currentTime = signal<Date>(new Date());
  currentLang = signal<string>('es');

  private timerInterval: any;

  ngOnInit() {
    this.translate.use(this.currentLang());
    // ejecutar la función cada segundo para actualizar la hora actual (1000ms)
    this.timerInterval = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  // como buena práctica, destruyo el intervalo cuando el componente se destruye para evitar fugas de memoria
  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // toggle del translate
  toggleLanguage() {
    const nextLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.currentLang.set(nextLang);
    this.translate.use(nextLang);
  }
}