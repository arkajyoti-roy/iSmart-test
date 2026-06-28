import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
  { path: 'join-us', loadComponent: () => import('./components/join-us/join-us.component').then(c => c.JoinUsComponent) },
  { path: 'gallery', loadComponent: () => import('./components/gallery/gallery.component').then(c => c.GalleryComponent) },
  { path: '**', redirectTo: '' }
];

