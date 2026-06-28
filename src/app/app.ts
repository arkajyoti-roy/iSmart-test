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
  protected readonly isFadingOut = signal(false);

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
      // 1. Minimum loader time of 2 seconds
      const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));
      
      // 2. Preload hero slider images
      const heroImages = [
        'slider/sl1.png', 'slider/sl2.png', 'slider/sl3.png', 'slider/sl4.png',
        'slider/sl5.png', 'slider/sl6.png', 'slider/sl7.png', 'slider/sl8.png'
      ];
      
      const imagePromises = heroImages.map(src => {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // resolve on error to prevent infinite loading
          img.src = src;
        });
      });
      
      // Wait for BOTH minimum time and all hero images to load
      Promise.all([minTimePromise, ...imagePromises]).then(() => {
        // Start crossfade transition
        this.isFadingOut.set(true);
        
        // Initialize AOS slightly after fade starts
        setTimeout(() => {
          AOS.init({
            duration: 800,
            once: true,
            offset: 100,
          });
        }, 100);

        // Remove loading screen from DOM after transition finishes
        setTimeout(() => {
          this.isLoading.set(false);
        }, 1000);
      });
    } else {
      this.isLoading.set(false);
      this.isFadingOut.set(true);
    }
  }
}
