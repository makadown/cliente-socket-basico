import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

/**
 * Servicio que utiliza servicio de socket para efectuar el chat.
 */
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(public wsService: WebsocketService) {}

  sendMessage(mensaje: string) {
    const payload = {
      de: this.wsService.usuario.nombre,
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  /**
   * Método para obtener mensaje
   */
  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }

  /**
   * Método para obtener mensaje privado
   */
  getPrivateMessages() {
    return this.wsService.listen('mensaje-privado');
  }

  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }

  /**
   * Esta emisión se hace para pedir una obtención de usuarios
   * activos. Se usa por ejemplo cuando se loguea o carga por primera vez
   * un usuario.
   */
  emitirUsuariosActivos() {
    this.wsService.emit('obtener-usuarios');
  }
}
