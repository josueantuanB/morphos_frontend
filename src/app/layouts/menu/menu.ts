import { Component, HostListener, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  sidebarCollapsed = signal(false);
  reportesOpen = signal(false);
  estadosOpen = signal(false);
  usersOpen = signal(false);
  isMobile = signal(false);
  currentRoute = signal('');
  pageTitle = signal('Dashboard');
  username = signal('Usuario');

  constructor(private router: Router, private authService: AuthService) {
    this.checkScreenSize();
    this.setupRouteListener();
    this.loadUserData();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private setupRouteListener() {
    // Establecer la ruta inicial
    this.currentRoute.set(this.router.url);
    this.updatePageTitle(this.router.url);

    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.url;
        this.currentRoute.set(url);
        this.updatePageTitle(url);
        
        // Auto-expand menus based on route
        if (url.includes('/users')) {
          this.usersOpen.set(true);
        } else if (url.includes('/reportes')) { // Assuming route path, adjust if needed
          this.reportesOpen.set(true);
        } else if (url.includes('/estados')) { // Assuming route path, adjust if needed
          this.estadosOpen.set(true);
        }
      });
  }

  private updatePageTitle(url: string) {
    if (url.includes('/dashboard')) {
      this.pageTitle.set('Dashboard');
    } else if (url.includes('/task')) {
      this.pageTitle.set('Tareas');
    } else if (url.includes('/forms')) {
      this.pageTitle.set('Formularios');
    } else if (url.includes('/users/management')) {
      this.pageTitle.set('Gestión usuarios');
    } else if (url.includes('/users/roles')) {
      this.pageTitle.set('Roles y Permisos');
    } else {
      this.pageTitle.set('Dashboard');
    }
  }

  private loadUserData() {
    const username = this.authService.getUsername();
    this.username.set(username);
  }

  private checkScreenSize() {
    this.isMobile.set(window.innerWidth < 768);
    if (this.isMobile()) {
      this.sidebarCollapsed.set(true);
    }
  }

  // Métodos para determinar si una ruta está activa
  isRouteActive(route: string): boolean {
    return this.currentRoute().includes(route);
  }

  isDashboardActive(): boolean {
    return this.currentRoute() === '/dashboard' || this.currentRoute() === '/';
  }

  isTaskActive(): boolean {
    return this.currentRoute().includes('/task');
  }

  isFormsActive(): boolean {
    return this.currentRoute().includes('/forms');
  }

  isUsersActive(): boolean {
    return this.currentRoute().includes('/users');
  }

  // Métodos de navegación
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleSidebar() {
    this.sidebarCollapsed.update(value => !value);
  }

  closeSidebar() {
    if (this.isMobile()) {
      this.sidebarCollapsed.set(true);
    }
  }

  toggleReportes() {
    this.reportesOpen.update(value => !value);
    // Cierra el otro submenu si está abierto
    if (this.reportesOpen()) {
      this.estadosOpen.set(false);
      this.usersOpen.set(false);
    }
  }

  toggleEstados() {
    this.estadosOpen.update(value => !value);
    // Cierra el otro submenu si está abierto
    if (this.estadosOpen()) {
      this.reportesOpen.set(false);
      this.usersOpen.set(false);
    }
  }

  toggleUsers() {
    this.usersOpen.update(value => !value);
    if (this.usersOpen()) {
      this.reportesOpen.set(false);
      this.estadosOpen.set(false);
    }
  }

  toggleUserMenu() {
    // Aquí puedes agregar la lógica para mostrar/ocultar el menú del usuario
    console.log('Toggle user menu');
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
