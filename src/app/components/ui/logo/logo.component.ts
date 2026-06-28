import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-start leading-none group cursor-pointer" [ngClass]="containerClass">
      <!-- Chevron Icon -->
      <svg [attr.width]="iconWidth" [attr.height]="iconHeight" viewBox="0 0 40 24" class="text-brand-accent mb-1 transform group-hover:-translate-y-1 transition-transform duration-300 ml-1" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="square" stroke-linejoin="miter">
        <polyline points="4 20 20 4 36 20"></polyline>
      </svg>
      <!-- Text -->
      <div class="flex flex-col">
        <div class="flex items-baseline gap-1.5">
          <span class="font-black tracking-tight" [ngClass]="theme === 'light' ? 'text-white' : 'text-jet-black'" [style.fontSize]="textSize">iSmart</span>
          <span class="font-bold text-brand-primary tracking-tight" [style.fontSize]="textSize">Lifestyle</span>
        </div>
        <span class="font-bold text-brand-primary tracking-tight" [style.fontSize]="textSize" [style.paddingLeft]="solutionsPadding">Solutions</span>
      </div>
    </div>
  `
})
export class LogoComponent {
  @Input() theme: 'light' | 'dark' = 'dark';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() containerClass: string = '';

  get iconWidth(): string {
    switch(this.size) {
      case 'sm': return '24';
      case 'lg': return '40';
      default: return '32';
    }
  }

  get iconHeight(): string {
    switch(this.size) {
      case 'sm': return '16';
      case 'lg': return '28';
      default: return '20';
    }
  }

  get textSize(): string {
    switch(this.size) {
      case 'sm': return '1.125rem'; // text-lg
      case 'lg': return '1.875rem'; // text-3xl
      default: return '1.5rem'; // text-2xl
    }
  }

  get solutionsPadding(): string {
    switch(this.size) {
      case 'sm': return '3.5rem';
      case 'lg': return '5.5rem';
      default: return '4.2rem';
    }
  }
}
