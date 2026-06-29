import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-start leading-none group cursor-pointer" [ngClass]="containerClass">
      <!-- Yellow Arrow Icon Wrapper -->
      <div class="relative w-full mb-0" [style.height.px]="arrowHeight">
        <img 
          src="/logo/iarrow.png" 
          alt="iSmart Logo Symbol" 
          [style.width.px]="arrowWidth" 
          [style.height.px]="arrowHeight" 
          [style.left]="arrowCenterOffset"
          class="absolute top-[3px] -translate-x-1/2 group-hover:-translate-y-1 transition-transform duration-300 object-contain"
        />
      </div>
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

  get arrowWidth(): number {
    switch (this.size) {
      case 'sm': return 32;
      case 'lg': return 60;
      default: return 46;
    }
  }

  get arrowHeight(): number {
    return this.arrowWidth;
  }

  get arrowCenterOffset(): string {
    switch (this.size) {
      case 'sm': return '0.125rem';
      case 'lg': return '0.22rem';
      default: return '0.17rem';
    }
  }

  get textSize(): string {
    switch (this.size) {
      case 'sm': return '1.125rem'; // text-lg
      case 'lg': return '1.875rem'; // text-3xl
      default: return '1.5rem'; // text-2xl
    }
  }

  get solutionsPadding(): string {
    switch (this.size) {
      case 'sm': return '3.5rem';
      case 'lg': return '5.5rem';
      default: return '4.2rem';
    }
  }
}
