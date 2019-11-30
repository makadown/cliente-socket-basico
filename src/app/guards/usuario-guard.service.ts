import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

/**
 * Guard para obligar que el usuario conectado tenga un nombre
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(public wsService: WebsocketService,
              private router: Router) {}

  canActivate() {
    if ( this.wsService.getUsuario() ) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
