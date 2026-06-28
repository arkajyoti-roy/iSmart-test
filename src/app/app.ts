import { Component, signal, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

import { LogoComponent } from './components/ui/logo/logo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LogoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('iSmart');
  protected readonly showScrollToTop = signal(false);
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly isLoading = signal(true);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollToTop.set(window.scrollY > 500);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Simulate loading screen for 3.5 seconds
      setTimeout(() => {
        this.isLoading.set(false);
        
        // Initialize AOS after loading screen is removed
        setTimeout(() => {
          AOS.init({
            duration: 800,
            once: true,
            offset: 100,
          });
        }, 100);
      }, 3500);
    } else {
      this.isLoading.set(false);
    }
  }
}

